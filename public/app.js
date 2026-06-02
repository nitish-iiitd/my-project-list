// projectsData is loaded globally from data/projects.js
let projects = projectsData || [];

function init() {
    if (!projects || projects.length === 0) {
        document.getElementById('app-root').innerHTML = `
            <div class="text-red-500 text-center py-12 flex flex-col items-center">
                <p class="text-xl font-semibold mb-2">Failed to load projects data.</p>
                <p class="text-gray-500">Ensure data/projects.js is correctly formatted and loaded.</p>
            </div>
        `;
        return;
    }
    handleRoute();
}

function getProjectIcon(id) {
    if (id === 'doxie') {
        return `<svg class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`;
    } else if (id === 'shelftrack') {
        return `<svg class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`;
    } else if (id === 'dockyard') {
        return `<svg class="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`;
    }
    // Default
    return `<svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`;
}

function getTechIcon(techName) {
    const name = techName.toLowerCase();
    if (name.includes('react') || name.includes('vue') || name.includes('css') || name.includes('typescript')) {
        return `<svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`;
    } else if (name.includes('node') || name.includes('go')) {
        return `<svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>`;
    } else if (name.includes('sql') || name.includes('prisma') || name.includes('database')) {
        return `<svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>`;
    }
    // Default
    return `<svg class="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`;
}

// Router
function handleRoute() {
    const hash = window.location.hash;
    
    // View Transition Helper
    const renderWithTransition = (renderFunc) => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                renderFunc();
            });
        } else {
            renderFunc();
        }
    };

    if (hash.startsWith('#project/')) {
        const id = hash.replace('#project/', '');
        renderWithTransition(() => renderProjectDetail(id));
    } else {
        renderWithTransition(() => renderHome());
    }
}

window.addEventListener('hashchange', handleRoute);

function renderHome() {
    const root = document.getElementById('app-root');
    
    let html = `
        <div class="space-y-12">
            <section class="space-y-4">
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Projects
                </h1>
                <p class="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    A selection of my recent work, open-source projects, and technical experiments. 
                    Built with modern tools and clean architecture.
                </p>
            </section>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    projects.forEach(p => {
        html += `
            <a href="#project/${p.id}" class="group glass-card rounded-2xl p-6 flex flex-col h-full cursor-pointer hover:-translate-y-1" style="view-transition-name: card-${p.id}">
                <div class="flex items-center gap-4 mb-4">
                    <div class="p-2.5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-white transition-colors" style="view-transition-name: icon-${p.id}">
                        ${getProjectIcon(p.id)}
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors" style="view-transition-name: title-${p.id}">
                            ${p.name}
                        </h2>
                        <span class="text-xs font-mono text-gray-500 font-medium tracking-wide">
                            ${p.year}
                        </span>
                    </div>
                </div>
                <p class="text-gray-600 leading-relaxed mb-6 flex-grow">
                    ${p.shortDescription}
                </p>
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${p.techStack.map(tech => `<span class="tech-tag">${getTechIcon(tech)} ${tech}</span>`).join('')}
                </div>
            </a>
        `;
    });

    html += `</div></div>`;
    root.innerHTML = html;
}

function renderProjectDetail(id) {
    const root = document.getElementById('app-root');
    const p = projects.find(proj => proj.id === id);

    if (!p) {
        window.location.hash = ''; // redirect to home
        return;
    }

    let html = `
        <article class="space-y-10">
            <a href="#" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group">
                <svg class="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Projects
            </a>

            <div class="glass-card rounded-3xl p-8 md:p-12" style="view-transition-name: card-${p.id}">
                <header class="mb-10">
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                        <div class="flex items-center gap-5">
                            <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100" style="view-transition-name: icon-${p.id}">
                                ${getProjectIcon(p.id)}
                            </div>
                            <div>
                                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2" style="view-transition-name: title-${p.id}">
                                    ${p.name}
                                </h1>
                                <p class="text-xl text-blue-600 font-medium">
                                    ${p.shortDescription}
                                </p>
                            </div>
                        </div>
                        
                        <a href="${p.deployedLink}" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center justify-center px-6 py-3 mt-2 md:mt-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/30">
                            Visit Project
                            <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <div class="flex flex-wrap gap-3 mt-8">
                        ${p.techStack.map(tech => `<span class="tech-tag">${getTechIcon(tech)} ${tech}</span>`).join('')}
                    </div>
                </header>

                <div class="prose prose-lg max-w-none text-gray-600">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">About this project</h3>
                    <p class="leading-relaxed">
                        ${p.detailedDescription}
                    </p>
                </div>
            </div>
        </article>
    `;

    root.innerHTML = html;
}

// Start app
init();
