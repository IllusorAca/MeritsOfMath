window.UIHelpers = (function () {

    // Sanitizes text strings to prevent HTML injections
    function sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Prompts MathJax to compile and typeset newly inserted LaTeX tags
    function triggerMathJax() {
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise().catch(err => console.log('MathJax:', err.message));
        }
    }

    // Animates the dialogue container scroll position to focus on latest messages
    function scrollToBottom(container) {
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    }

    // Appends a formatted message box to the active chat screen
    function addMessage(content, type = 'ai', container, extraClasses = []) {
        const msgDiv = document.createElement('div');
        const baseClass = type === 'user' ? 'user-message' : 'ai-message';
        let classStr = `message ${baseClass}`;

        if (type === 'hint') classStr += ' hint-message';
        if (type === 'reveal') classStr += ' reveal-message';

        extraClasses.forEach(c => { classStr += ` ${c}`; });
        msgDiv.className = classStr;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = `avatar ${type === 'user' ? 'user-avatar' : 'ai-avatar'}`;
        avatarDiv.innerHTML = type === 'user' ? 'L' : '<i class="fa-solid fa-robot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content;

        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(contentDiv);
        container.appendChild(msgDiv);
        triggerMathJax();
        scrollToBottom(container);
    }

    // Displays an animated typing bubble placeholder in the chat view
    function showTypingIndicator(container) {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ai-message typing-msg';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="avatar ai-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>`;
        container.appendChild(msgDiv);
        scrollToBottom(container);
        return id;
    }

    // Erases the typing bubble placeholder matching the target ID
    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // Translates standard markdown and LaTeX delimiters into HTML elements
    function parseMarkdown(text) {
        if (!window.marked) return text;
        text = text.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');
        text = text.replace(/\$([^$]+?)\$/g, '\\($1\\)');

        let mathBlocks = [];
        text = text.replace(/\\\([\s\S]*?\\\)/g, match => {
            mathBlocks.push(`<span class="math-pill">${match}</span>`);
            return `%%MATH_${mathBlocks.length - 1}%%`;
        }).replace(/\\\[([\s\S]*?)\\\]/g, (match, inner) => {
            const cleanInner = inner.trim();
            if (cleanInner.length < 5 && !cleanInner.includes('\\') && !cleanInner.includes('^')) {
                mathBlocks.push(`<span class="math-pill">\\(${cleanInner}\\)</span>`);
                return `%%MATH_${mathBlocks.length - 1}%%`;
            }
            mathBlocks.push(`<div class="math-block">\\[${inner}\\]</div>`);
            return `%%MATHBLOCK_${mathBlocks.length - 1}%%`;
        });

        text = marked.parse(text);
        text = text.replace(/%%MATH_(\d+)%%/g, (m, i) => mathBlocks[i])
            .replace(/%%MATHBLOCK_(\d+)%%/g, (m, i) => mathBlocks[i]);
        return text;
    }

    // Renders interactive node cards at designated coordinates on the skill tree map
    function renderSkillTree(container, skillNodes) {
        container.querySelectorAll('.tree-node').forEach(n => n.remove());
        skillNodes.forEach(node => {
            const div = document.createElement('div');
            div.className = `tree-node ${node.status}`;
            div.id = `node-${node.id}`;
            div.style.left = `${node.x}%`;
            div.style.top = `${node.y}%`;
            div.textContent = node.label;
            if (node.status === 'critical') div.classList.add('pulse');
            div.addEventListener('click', () => {
                if (window.SkillTree) window.SkillTree.onNodeClick(node.id);
            });
            container.appendChild(div);
        });
    }

    // Draws SVG connection lines linking skill tree parent and child nodes
    function drawConnections(container, svg, skillNodes, skillEdges) {
        svg.innerHTML = '';
        const containerRect = container.getBoundingClientRect();

        skillEdges.forEach(edge => {
            const fromNode = document.getElementById(`node-${edge.from}`);
            const toNode = document.getElementById(`node-${edge.to}`);
            if (!fromNode || !toNode) return;

            const fromRect = fromNode.getBoundingClientRect();
            const toRect = toNode.getBoundingClientRect();

            const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
            const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
            const x2 = toRect.left + toRect.width / 2 - containerRect.left;
            const y2 = toRect.top + toRect.height / 2 - containerRect.top;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);

            const toNodeData = skillNodes.find(n => n.id === edge.to);
            if (toNodeData) {
                const strokeMap = {
                    'mastered': 'rgba(52, 211, 153, 0.3)',
                    'partial': 'rgba(251, 191, 36, 0.25)',
                    'critical': 'rgba(248, 113, 113, 0.25)',
                    'locked': 'rgba(71, 85, 105, 0.2)'
                };
                line.setAttribute('stroke', strokeMap[toNodeData.status] || strokeMap['locked']);
            }
            line.setAttribute('stroke-width', '3');
            svg.appendChild(line);
        });
    }

    // Displays the current challenge progress ratio in the battle header
    function updateBattleProgress(element, current, total) {
        element.textContent = `${Math.min(current + 1, total)} / ${total}`;
    }

    // Spawns a floating notification toast message
    function showNotification(title, message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: 'fa-circle-check',
            error: 'fa-circle-xmark',
            warning: 'fa-triangle-exclamation',
            info: 'fa-circle-info'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fa-solid ${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-progress" style="animation-duration: 4000ms"></div>
        `;
        container.appendChild(toast);
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    return {
        sanitizeHTML,
        triggerMathJax,
        scrollToBottom,
        addMessage,
        showTypingIndicator,
        removeTypingIndicator,
        parseMarkdown,
        renderSkillTree,
        drawConnections,
        updateBattleProgress,
        showNotification
    };
})();
