// 性能优化工具函数（接口不变）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript错误:', event.error);
    });
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Promise拒绝:', event.reason);
    });
}

// 修复：补全缺失的闭合括号（接口不变）
function monitorPerformance() {
    if ('performance' in window && 'measure' in window.performance) {
        const performanceEntries = performance.getEntriesByType('navigation');
        if (performanceEntries.length > 0) {
            const navEntry = performanceEntries[0];
            console.log('页面加载时间:', navEntry.loadEventEnd - navEntry.startTime, 'ms');
        }
        const resourceEntries = performance.getEntriesByType('resource');
        resourceEntries.forEach(entry => {
            if (entry.duration > 1000) {
                console.log(`资源加载较慢: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
            }
        });
    }
}

function initResponsiveLayout() {
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.classList.add('sidebar-overlay');
    document.body.appendChild(sidebarOverlay);
    const debouncedResize = debounce(() => {
        handleResize();
    }, 300);
    window.addEventListener('resize', debouncedResize);
    handleResize();
    sidebarOverlay.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
}

// 补全：被调用但缺失的核心函数（接口新增但保证原有调用有效）
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    if (sidebar) {
        sidebar.classList.toggle('open');
        sidebarOverlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    }
}

function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('main');
    if (window.innerWidth >= 1024) {
        if (sidebar) sidebar.classList.remove('open');
        if (document.querySelector('.sidebar-overlay')) {
            document.querySelector('.sidebar-overlay').style.display = 'none';
        }
        if (mainContent) mainContent.style.marginLeft = '250px';
    } else {
        if (mainContent) mainContent.style.marginLeft = '0';
    }
}

function animateDataCards() {
    const cards = document.querySelectorAll('.data-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

function initButtonRipple() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 确保按钮不会因为添加波纹元素而变大
            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            // 使用CSS中已定义的ripple-effect类
            ripple.classList.add('ripple-effect');
            
            // 设置波纹的位置和大小
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function animateOnLoad() {
    const animateElements = document.querySelectorAll('.data-card, .chart-container, .glass-effect');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            const rect = element.getBoundingClientRect();
            if (rect.left < window.innerWidth / 2) {
                element.classList.add('animate-fadeInLeft');
            } else {
                element.classList.add('animate-fadeInRight');
            }
        }, 100 * index);
    });
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
        title.classList.add('text-shadow-neon');
    });
}

function updateCurrentTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        timeEl.textContent = now.toLocaleString('zh-CN', options);
    }
}

// 修复：修正initOtherCharts嵌套错误（接口不变）
function initCharts() {
    try {
        if (!window.Chart) {
            console.error('Chart.js未加载，无法初始化图表');
            return;
        }
        const energyCanvas = document.getElementById('energy-output-chart');
        if (energyCanvas) {
            const energyCtx = energyCanvas.getContext('2d');
            new Chart(energyCtx, {
                type: 'line',
                data: {
                    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                    datasets: [{
                        label: '风电',
                        data: [3.2, 4.5, 5.8, 6.2, 5.5, 4.8, 5.2, 6.5],
                        borderColor: '#165DFF',
                        backgroundColor: 'rgba(22, 93, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: '光伏',
                        data: [0, 0, 0.5, 2.8, 3.5, 2.2, 0.8, 0],
                        borderColor: '#FF7D00',
                        backgroundColor: 'rgba(255, 125, 0, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: '燃料电池',
                        data: [2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4],
                        borderColor: '#00B42A',
                        backgroundColor: 'rgba(0, 180, 42, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } },
                        tooltip: {
                            backgroundColor: 'rgba(29, 33, 41, 0.9)',
                            borderColor: '#165DFF',
                            borderWidth: 1,
                            titleColor: '#FFFFFF',
                            bodyColor: '#FFFFFF',
                            padding: 10,
                            cornerRadius: 6
                        }
                    },
                    interaction: { mode: 'index', intersect: false }
                }
            });
        }
        initOtherCharts();
    } catch (error) {
        console.error('图表初始化失败:', error);
        document.querySelectorAll('.chart-container').forEach(container => {
            if (!container.querySelector('canvas').height) {
                container.innerHTML += '<div class="text-center text-red-400 mt-4">图表加载失败</div>';
            }
        });
    }
}

// 修复：拆分错误嵌套的代码（接口不变）
function initOtherCharts() {
    try {
        // 能效分布图
        const efficiencyCanvas = document.getElementById('efficiency-distribution-chart');
        if (efficiencyCanvas) {
            const efficiencyCtx = efficiencyCanvas.getContext('2d');
            new Chart(efficiencyCtx, {
                type: 'bar',
                data: {
                    labels: ['冷水机组', '冷却塔', '水泵', '末端设备'],
                    datasets: [{
                        label: '能效值',
                        data: [4.2, 3.8, 0.85, 0.72],
                        backgroundColor: 'rgba(22, 93, 255, 0.6)',
                        borderColor: 'rgba(22, 93, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' }
                        },
                        x: {
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' }
                        }
                    },
                    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } }
                }
            });
        }

        // 能源结构占比
        const structureCanvas = document.getElementById('energy-structure-chart');
        if (structureCanvas) {
            const structureCtx = structureCanvas.getContext('2d');
            new Chart(structureCtx, {
                type: 'pie',
                data: {
                    labels: ['风电', '光伏', '燃料电池', '电网'],
                    datasets: [{
                        data: [35, 20, 15, 30],
                        backgroundColor: ['#165DFF', '#FF7D00', '#00B42A', '#86909C']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } }
                }
            });
        }

        // 系统可靠性分析
        const reliabilityCanvas = document.getElementById('reliability-chart');
        if (reliabilityCanvas) {
            const reliabilityCtx = reliabilityCanvas.getContext('2d');
            new Chart(reliabilityCtx, {
                type: 'line',
                data: {
                    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    datasets: [{
                        label: '可靠性',
                        data: [99.8, 99.9, 99.7, 99.9, 99.8, 99.9, 99.95],
                        borderColor: '#00B42A',
                        backgroundColor: 'rgba(0, 180, 42, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            min: 99,
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' }
                        },
                        x: {
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' }
                        }
                    },
                    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } }
                }
            });
        }

        // 碳排放量对比图
        const carbonCanvas = document.getElementById('carbon-emission-chart');
        if (carbonCanvas) {
            const carbonCtx = carbonCanvas.getContext('2d');
            new Chart(carbonCtx, {
                type: 'bar',
                data: {
                    labels: ['传统系统', '本系统', '优化后', '零碳目标'],
                    datasets: [{
                        label: '碳排放量 (tCO₂)',
                        data: [12.5, 4.2, 2.8, 0],
                        backgroundColor: [
                            'rgba(245, 63, 63, 0.6)',
                            'rgba(255, 125, 0, 0.6)',
                            'rgba(22, 93, 255, 0.6)',
                            'rgba(0, 180, 42, 0.6)'
                        ],
                        borderColor: [
                            'rgba(245, 63, 63, 1)',
                            'rgba(255, 125, 0, 1)',
                            'rgba(22, 93, 255, 1)',
                            'rgba(0, 180, 42, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } },
                        tooltip: {
                            backgroundColor: 'rgba(29, 33, 41, 0.9)',
                            borderColor: '#165DFF',
                            borderWidth: 1,
                            titleColor: '#FFFFFF',
                            bodyColor: '#FFFFFF',
                            padding: 10,
                            cornerRadius: 6
                        }
                    }
                }
            });
        }

        // 机器学习预测模型图表
        const mlCanvas = document.getElementById('ml-forecast-chart');
        if (mlCanvas) {
            const mlCtx = mlCanvas.getContext('2d');
            new Chart(mlCtx, {
                type: 'line',
                data: {
                    labels: ['0h', '6h', '12h', '18h', '24h'],
                    datasets: [{
                        label: '实际值',
                        data: [2.4, 2.6, 2.8, 2.5, 2.7],
                        borderColor: '#165DFF',
                        backgroundColor: 'rgba(22, 93, 255, 0.1)',
                        tension: 0.4,
                        fill: false
                    }, {
                        label: '预测值',
                        data: [2.3, 2.5, 2.7, 2.6, 2.8],
                        borderColor: '#00F0FF',
                        backgroundColor: 'rgba(0, 240, 255, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(29, 33, 41, 0.9)',
                            borderColor: '#00F0FF',
                            borderWidth: 1,
                            titleColor: '#FFFFFF',
                            bodyColor: '#FFFFFF',
                            padding: 8,
                            cornerRadius: 4
                        }
                    },
                    interaction: { mode: 'index', intersect: false }
                }
            });
        }
    } catch (error) {
        console.error('其他图表初始化失败:', error);
    }
}

// 修复：修正D3代码语法错误（接口不变）
function initSystemArchitecture() {
    try {
        const container = document.getElementById('system-architecture');
        if (!container) {
            console.error('系统架构图容器未找到');
            return;
        }
        const loadingElements = container.querySelectorAll('.fa-cog, .text-dark-200');
        loadingElements.forEach(el => el.style.display = 'none');
        const width = container.clientWidth;
        const height = container.clientHeight;
        const title = container.querySelector('.bg-black');
        container.innerHTML = '';
        if (title) {
            container.appendChild(title);
        }
        const svg = d3.select('#system-architecture')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${height}`);
        const defs = svg.append('defs');
        defs.append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 8)
            .attr('markerHeight', 8)
            .append('path')
            .attr('d', 'M 0,-5 L 10,0 L 0,5')
            .attr('fill', '#4fc3f7');
        const glowFilter = defs.append('filter').attr('id', 'glow');
        glowFilter.append('feGaussianBlur')
            .attr('stdDeviation', '3.5')
            .attr('result', 'coloredBlur');
        const feMerge = glowFilter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
        defs.append('linearGradient')
            .attr('id', 'linkGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%')
            .selectAll('stop')
            .data([
                {offset: '0%', color: '#4fc3f7'},
                {offset: '100%', color: '#8c9eff'}
            ])
            .enter().append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        const nodes = [
            { id: 'upstream', name: '上游供能', x: width * 0.25, y: height * 0.3, color: '#4fc3f7', icon: 'fa-bolt' },
            { id: 'storage', name: '储气库', x: width * 0.5, y: height * 0.5, color: '#8c9eff', icon: 'fa-database' },
            { id: 'downstream', name: '下游应用', x: width * 0.75, y: height * 0.3, color: '#43a047', icon: 'fa-server' },
            { id: 'ai', name: 'AI调控系统', x: width * 0.5, y: height * 0.15, color: '#ff7043', icon: 'fa-brain' }
        ];
        const subsystemNodes = [
            { id: 'wind', name: '风电系统', parent: 'upstream', color: '#4fc3f7', icon: 'fa-wind' },
            { id: 'solar', name: '光伏系统', parent: 'upstream', color: '#4fc3f7', icon: 'fa-sun' },
            { id: 'hydrogen', name: '氢能系统', parent: 'upstream', color: '#4fc3f7', icon: 'fa-water' },
            { id: 'compressor', name: '压缩机', parent: 'storage', color: '#8c9eff', icon: 'fa-cogs' },
            { id: 'gas_storage', name: '高压储气', parent: 'storage', color: '#8c9eff', icon: 'fa-gas-pump' },
            { id: 'data_center', name: '数据中心', parent: 'downstream', color: '#43a047', icon: 'fa-server' },
            { id: 'sofc', name: '固体氧化物燃料电池', parent: 'downstream', color: '#43a047', icon: 'fa-battery-three-quarters' },
            { id: 'carbon_capture', name: '碳捕集系统', parent: 'downstream', color: '#43a047', icon: 'fa-filter' }
        ];
        subsystemNodes.forEach(node => {
            const parent = nodes.find(n => n.id === node.parent);
            if (node.parent === 'upstream') {
                const index = subsystemNodes.filter(n => n.parent === 'upstream').indexOf(node);
                node.x = parent.x - 60 + index * 40;
                node.y = parent.y + 80;
            } else if (node.parent === 'storage') {
                const index = subsystemNodes.filter(n => n.parent === 'storage').indexOf(node);
                node.x = parent.x - 30 + index * 60;
                node.y = parent.y + 60;
            } else if (node.parent === 'downstream') {
                const index = subsystemNodes.filter(n => n.parent === 'downstream').indexOf(node);
                node.x = parent.x - 60 + index * 40;
                node.y = parent.y + 80;
            }
        });
        const allNodes = [...nodes, ...subsystemNodes];
        const links = [
            {source: 'upstream', target: 'storage'},
            {source: 'storage', target: 'downstream'},
            {source: 'ai', target: 'upstream'},
            {source: 'ai', target: 'storage'},
            {source: 'ai', target: 'downstream'},
            {source: 'wind', target: 'upstream'},
            {source: 'solar', target: 'upstream'},
            {source: 'hydrogen', target: 'upstream'},
            {source: 'compressor', target: 'storage'},
            {source: 'gas_storage', target: 'storage'},
            {source: 'data_center', target: 'downstream'},
            {source: 'sofc', target: 'downstream'},
            {source: 'carbon_capture', target: 'downstream'}
        ];

        const link = svg.selectAll('.link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('stroke', d => {
                const isMainLink = ['upstream', 'storage', 'downstream', 'ai'].includes(d.source) && 
                                   ['upstream', 'storage', 'downstream', 'ai'].includes(d.target);
                return isMainLink ? 'url(#linkGradient)' : '#4fc3f7';
            })
            .attr('stroke-width', d => {
                const isMainLink = ['upstream', 'storage', 'downstream', 'ai'].includes(d.source) && 
                                   ['upstream', 'storage', 'downstream', 'ai'].includes(d.target);
                return isMainLink ? 2 : 1.2;
            })
            .attr('stroke-opacity', 0.7)
            .attr('fill', 'none')
            .attr('marker-end', 'url(#arrowhead)')
            .style('filter', d => {
                const isMainLink = ['upstream', 'storage', 'downstream', 'ai'].includes(d.source) && 
                                   ['upstream', 'storage', 'downstream', 'ai'].includes(d.target);
                return isMainLink ? 'url(#glow)' : 'none';
            });

        function tick() {
            link.attr('d', d => {
                const sourceNode = allNodes.find(n => n.id === d.source);
                const targetNode = allNodes.find(n => n.id === d.target);
                if (!sourceNode || !targetNode) return '';
                const dx = targetNode.x - sourceNode.x;
                const dy = targetNode.y - sourceNode.y;
                const dr = Math.sqrt(dx * dx + dy * dy);
                const isSubsystemLink = subsystemNodes.some(n => n.id === d.source) || 
                                       subsystemNodes.some(n => n.id === d.target);
                if (isSubsystemLink) {
                    return `M ${sourceNode.x},${sourceNode.y} L ${targetNode.x},${targetNode.y}`;
                } else if (d.source === 'ai') {
                    return `M ${sourceNode.x},${sourceNode.y} C ${sourceNode.x},${sourceNode.y + dr/3} ${targetNode.x},${targetNode.y - dr/3} ${targetNode.x},${targetNode.y}`;
                } else {
                    return `M ${sourceNode.x},${sourceNode.y} C ${sourceNode.x + dr/3},${sourceNode.y} ${targetNode.x - dr/3},${targetNode.y} ${targetNode.x},${targetNode.y}`;
                }
            });
        }
        tick();

        allNodes.forEach((d, i) => {
            const gradientId = `nodeGradient${i}`;
            defs.append('radialGradient')
                .attr('id', gradientId)
                .attr('cx', '50%')
                .attr('cy', '50%')
                .attr('r', '50%')
                .attr('fx', '50%')
                .attr('fy', '50%')
                .selectAll('stop')
                .data([
                    {offset: '0%', color: d3.color(d.color).brighter(0.5)},
                    {offset: '100%', color: d.color}
                ])
                .enter().append('stop')
                .attr('offset', d => d.offset)
                .attr('stop-color', d => d.color);
            d.gradientId = gradientId;
        });

        const nodeGroups = svg.selectAll('.node-group')
            .data(allNodes)
            .enter()
            .append('g')
            .attr('class', 'node-group')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on('mouseover', function(event, d) {
                const isMainNode = ['upstream', 'storage', 'downstream', 'ai'].includes(d.id);
                d3.select(this).select('.node-circle')
                    .attr('r', isMainNode ? 50 : 30)
                    .style('filter', 'url(#glow)');
                const tooltip = d3.select('body').append('div')
                    .attr('class', 'tooltip')
                    .style('position', 'absolute')
                    .style('background', 'rgba(0,0,0,0.8)')
                    .style('color', 'white')
                    .style('padding', '4px 8px')
                    .style('border-radius', '4px')
                    .style('pointer-events', 'none')
                    .style('z-index', 9999)
                    .text(d.name)
                    .attr('data-id', d.id);
                tooltip.style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseout', function(event, d) {
                const isMainNode = ['upstream', 'storage', 'downstream', 'ai'].includes(d.id);
                d3.select(this).select('.node-circle')
                    .attr('r', isMainNode ? 40 : 20)
                    .style('filter', 'none');
                d3.selectAll('.tooltip[data-id="' + d.id + '"]').remove();
            });

        nodeGroups.append('circle')
            .attr('class', 'node-circle')
            .attr('r', d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? 40 : 20)
            .attr('fill', d => `url(#${d.gradientId})`)
            .attr('stroke', '#fff')
            .attr('stroke-width', d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? 2 : 1)
            .style('transition', 'all 0.3s ease');

        nodeGroups.filter(d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id))
            .each(function(d) {
                const nodeElement = d3.select(this);
                const radius = 40;
                const maxRadius = radius + 20;
                const duration = 3000;
                function animatePulse() {
                    nodeElement.append('circle')
                        .attr('r', radius)
                        .attr('fill', 'none')
                        .attr('stroke', d.color)
                        .attr('stroke-width', 1)
                        .attr('opacity', 0.7)
                        .transition()
                        .duration(duration)
                        .attr('r', maxRadius)
                        .attr('opacity', 0)
                        .on('end', function() {
                            d3.select(this).remove();
                            animatePulse();
                        });
                }
                animatePulse();
            });

        nodeGroups.append('foreignObject')
            .attr('width', d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? 40 : 20)
            .attr('height', d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? 40 : 20)
            .attr('x', d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? -20 : -10)
            .attr('y', d => ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? -20 : -10)
            .append('xhtml:div')
            .style('font-size', function(d) {
                return ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? '30px' : '16px';
            })
            .style('color', function(d) {
                return d.color;
            })
            .style('text-align', 'center')
            .style('line-height', function(d) {
                return ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? '40px' : '20px';
            })
            .html(function(d) {
                return `<i class="fa ${d.icon}"></i>`;
            });

        nodeGroups.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', function(d) {
                return ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? 70 : 40;
            })
            .attr('fill', '#FFFFFF')
            .attr('font-size', function(d) {
                return ['upstream', 'storage', 'downstream', 'ai'].includes(d.id) ? '14px' : '12px';
            })
            .text(function(d) {
                return d.name;
            });

        const details = [
            { id: 'upstream-details', x: width * 0.25, y: height * 0.6, title: '上游供能', items: ['风电：5.8 MW', '光伏：3.2 MW', '氢能储能：1000 kg', '智能调度'] },
            { id: 'storage-details', x: width * 0.5, y: height * 0.8, title: '储气库', items: ['压缩机效率：94.2%', '储气压力：25.5 MPa', '余热回收：85%', '智能控制'] },
            { id: 'downstream-details', x: width * 0.75, y: height * 0.6, title: '下游应用', items: ['数据中心：3.5 MW', '燃料电池：2.4 MW', '碳捕集率：65%', '余热制冷：200 RT'] }
        ];
        details.forEach(detail => {
            const detailGroup = svg.append('foreignObject')
                .attr('x', detail.x - 100)
                .attr('y', detail.y)
                .attr('width', 200)
                .attr('height', 120)
                .append('xhtml:div')
                .style('background', 'rgba(11, 14, 23, 0.8)')
                .style('border', '1px solid rgba(79, 195, 247, 0.3)')
                .style('border-radius', '8px')
                .style('padding', '10px')
                .style('font-family', 'sans-serif')
                .style('color', 'white')
                .style('backdrop-filter', 'blur(10px)')
                .style('-webkit-backdrop-filter', 'blur(10px)');
            detailGroup.append('h4')
                .style('margin', '0 0 8px 0')
                .style('font-size', '14px')
                .style('color', '#4fc3f7')
                .text(detail.title);
            const ul = detailGroup.append('ul')
                .style('margin', '0')
                .style('padding-left', '20px');
            detail.items.forEach(item => {
                ul.append('li')
                    .style('font-size', '12px')
                    .style('margin', '2px 0')
                    .style('color', 'rgba(255, 255, 255, 0.7)')
                    .text(item);
            });
        });
    } catch (error) {
        console.error('系统架构图初始化失败:', error);
        const container = document.getElementById('system-architecture');
        if (container) {
            const title = container.querySelector('.bg-black');
            container.innerHTML = '';
            if (title) {
                container.appendChild(title);
            }
            container.innerHTML += `
                <div class="flex flex-col items-center justify-center p-6 h-64 text-white">
                    <i class="fas fa-exclamation-triangle text-yellow-400 text-4xl mb-4"></i>
                    <p class="text-lg font-medium mb-2">系统架构图加载失败</p>
                    <p class="text-sm text-gray-300 mb-4">错误详情：${error.message}</p>
                    <button onclick="initSystemArchitecture()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition">
                        重新加载
                    </button>
                </div>
            `;
        }
    }
}

function showTooltip(event, content) {
    let tooltip = document.getElementById('chart-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'chart-tooltip';
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }
    tooltip.textContent = content;
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY - 30) + 'px';
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('chart-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
    }
}

// 修复：补全缺失的闭合括号（接口不变）
function addInteractions() {
    const sidebar = document.querySelector('.sidebar');
    const openSidebarBtn = document.querySelector('.open-sidebar-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mainContent = document.querySelector('main');
    if (openSidebarBtn) {
        openSidebarBtn.addEventListener('click', toggleSidebar);
    }
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', toggleSidebar);
    }
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            item.classList.add('animate-scaleIn');
            setTimeout(() => {
                item.classList.remove('animate-scaleIn');
            }, 300);
            if (window.innerWidth < 1024) {
                toggleSidebar();
            }
            if (mainContent) {
                mainContent.classList.add('animate-fadeIn');
                setTimeout(() => {
                    mainContent.classList.remove('animate-fadeIn');
                }, 500);
            }
        });
    });
    const buttonHoverHandler = throttle((event) => {
        const button = event.currentTarget;
        if (event.type === 'mouseenter') {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            if (button.classList.contains('btn-primary')) {
                button.style.boxShadow = '0 8px 16px rgba(79, 195, 247, 0.4)';
            }
        } else if (event.type === 'mouseleave') {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '';
        } else if (event.type === 'mousedown') {
            button.style.transform = 'translateY(0)';
        } else if (event.type === 'mouseup') {
            button.style.transform = 'translateY(-2px)';
        }
    }, 50);
    const buttons = document.querySelectorAll('button:not(.no-hover)');
    buttons.forEach(button => {
        button.style.transition = 'all 0.3s ease';
        button.addEventListener('mouseenter', buttonHoverHandler);
        button.addEventListener('mouseleave', buttonHoverHandler);
        button.addEventListener('mousedown', buttonHoverHandler);
        button.addEventListener('mouseup', buttonHoverHandler);
    });
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.addEventListener('focus', () => {
            select.style.outline = 'none';
            select.style.borderColor = '#4fc3f7';
            select.style.boxShadow = '0 0 10px rgba(79, 195, 247, 0.3)';
        });
        select.addEventListener('blur', () => {
            select.style.borderColor = '';
            select.style.boxShadow = '';
        });
    });
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.outline = 'none';
            input.style.borderColor = '#4fc3f7';
            input.style.boxShadow = '0 0 10px rgba(79, 195, 247, 0.3)';
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
    const debouncedResizeHandler = debounce(() => {
        initSystemArchitecture();
        handleResize();
    }, 500);
    window.addEventListener('resize', debouncedResizeHandler);
    const labelHoverHandler = throttle((event) => {
        const label = event.currentTarget;
        if (event.type === 'mouseenter') {
            label.style.transform = 'scale(1.05)';
        } else {
            label.style.transform = 'scale(1)';
        }
    }, 50);
    const statusLabels = document.querySelectorAll('.inline-flex.items-center');
    statusLabels.forEach(label => {
        if (label.querySelector('.status-indicator')) {
            label.classList.add('transition-all', 'duration-300');
            label.addEventListener('mouseenter', labelHoverHandler);
            label.addEventListener('mouseleave', labelHoverHandler);
        }
    });
    const cardHoverHandler = throttle((event) => {
        const card = event.currentTarget;
        if (event.type === 'mouseenter') {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
            const chart = card.querySelector('canvas');
            if (chart) {
                chart.style.transform = 'scale(1.02)';
            }
        } else {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
            const chart = card.querySelector('canvas');
            if (chart) {
                chart.style.transform = 'scale(1)';
            }
        }
    }, 50);
    const dataCards = document.querySelectorAll('.data-card, .bg-dark-100');
    dataCards.forEach((card, index) => {
        card.classList.add('data-card');
        card.addEventListener('mouseenter', cardHoverHandler);
        card.addEventListener('mouseleave', cardHoverHandler);
    });
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tab.classList.add('animate-scaleIn');
            setTimeout(() => {
                tab.classList.remove('animate-scaleIn');
            }, 300);
        });
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('chart-container')) {
                    entry.target.classList.add('animate-fadeInRight');
                } else if (entry.target.classList.contains('data-card')) {
                    entry.target.classList.add('animate-fadeInUp');
                } else {
                    entry.target.classList.add('animate-fadeIn');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.data-card, .chart-container, .glass-effect, h2, h3');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    const statusIndicators = document.querySelectorAll('.status-indicator');
    statusIndicators.forEach(indicator => {
        if (indicator.classList.contains('online')) {
            indicator.classList.add('animate-pulse-slow');
        } else if (indicator.classList.contains('warning')) {
            indicator.style.animation = 'pulse 1.5s infinite';
        } else if (indicator.classList.contains('critical')) {
            indicator.style.animation = 'pulse 1s infinite';
        }
    });
}

// 页面加载入口（接口不变）
window.addEventListener('DOMContentLoaded', () => {
    if (!window.Chart) {
        console.warn('Chart.js未加载，尝试重新加载...');
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js';
        chartScript.onload = () => {
            console.log('Chart.js重新加载成功');
            initCharts();
        };
        chartScript.onerror = () => {
            console.error('Chart.js加载失败，使用降级方案');
            document.querySelectorAll('canvas').forEach(canvas => {
                const parent = canvas.parentElement;
                if (parent) {
                    parent.innerHTML += '<div class="text-center text-red-400 mt-4">图表加载失败，请刷新页面重试</div>';
                }
            });
        };
        document.head.appendChild(chartScript);
    }
    monitorPerformance();
    setupErrorHandling();
    setTimeout(() => {
        try {
            const loader = document.getElementById('loader');
            const app = document.getElementById('app');
            if (loader && app) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    app.classList.remove('hidden');
                    app.classList.add('animate-fadeIn');
                    try {
                        animateOnLoad();
                    } catch (e) {
                        console.warn('动画加载失败，但页面已显示:', e);
                    }
                }, 500);
            }
        } catch (error) {
            console.error('隐藏加载器时出错:', error);
            const app = document.getElementById('app');
            if (app) app.classList.remove('hidden');
            const loader = document.getElementById('loader');
            if (loader) loader.style.display = 'none';
        }
    }, 1000);
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    initCharts();
    function loadSystemArchitecture() {
        if (window.d3) {
            console.log('D3.js已加载，初始化系统架构图');
            setTimeout(() => {
                initSystemArchitecture();
            }, 500);
        } else {
            console.warn('D3.js未加载，1秒后重试');
            const d3Script = document.createElement('script');
            d3Script.src = 'https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js';
            d3Script.onload = () => {
                console.log('D3.js重新加载成功');
                setTimeout(() => {
                    initSystemArchitecture();
                }, 500);
            };
            d3Script.onerror = () => {
                console.error('D3.js加载失败');
                const container = document.getElementById('system-architecture');
                if (container) {
                    container.innerHTML = `
                        <div class="absolute top-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-lg text-cyan-400 text-xl font-bold">
                            零碳园区协控平台 - 系统架构
                        </div>
                        <div class="flex flex-col items-center justify-center h-full">
                            <i class="fa fa-exclamation-triangle text-warning text-4xl mb-4"></i>
                            <p class="text-dark-200">D3.js加载失败，无法显示系统架构图</p>
                            <button class="mt-4 bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded text-sm transition-colors"
                                    onclick="location.reload()">
                                <i class="fa fa-refresh mr-1"></i>刷新页面
                            </button>
                        </div>
                    `;
                }
            };
            const existingD3 = document.querySelector('script[src*="d3.min.js"]');
            if (!existingD3) {
                document.head.appendChild(d3Script);
            }
            setTimeout(loadSystemArchitecture, 2000);
        }
    }
    loadSystemArchitecture();
    initResponsiveLayout();
    setTimeout(() => {
        addInteractions();
    }, 800);
    animateDataCards();
    initButtonRipple();
    lazyLoadImages();
});