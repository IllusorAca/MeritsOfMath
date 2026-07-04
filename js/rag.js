window.RAGEngine = (function () {
    let indexedChunks = [];

    // Generates indexes of RAG chunks from the current curriculum database
    function init() {
        if (window.DB && typeof window.DB.getChunks === 'function') {
            indexedChunks = window.DB.getChunks();
            console.log(`[RAG] Indexed ${indexedChunks.length} curriculum chunks.`);
        }
    }

    // Tokenizes text input by filtering out non-word characters and converting to lowercase
    function tokenize(text) {
        return (text || '').toLowerCase()
            .replace(/[^\w\s\-\\\(\)\/]/g, ' ')
            .split(/\s+/)
            .filter(t => t.length > 1);
    }

    // Computes simple term-frequency overlap score between query tokens and chunk text
    function scoreChunk(chunk, queryTokens) {
        const chunkText = `${chunk.title} ${chunk.text} ${(chunk.metadata.keywords || []).join(' ')}`.toLowerCase();
        let score = 0;
        queryTokens.forEach(token => {
            if (chunkText.includes(token)) {
                score += 1.0;
                if (chunk.metadata.keywords && chunk.metadata.keywords.includes(token)) {
                    score += 1.5;
                }
            }
        });
        return score;
    }

    // Searches indexed chunks using keyword term-frequency similarity matching
    function search(query, limit = 3) {
        if (indexedChunks.length === 0) init();
        const tokens = tokenize(query);
        if (tokens.length === 0) return [];
        return indexedChunks
            .map(chunk => ({ chunk, score: scoreChunk(chunk, tokens) }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.chunk);
    }

    // Routes and retrieves custom chunks dynamically based on query context, mistake count, and node state
    function adaptiveRetrieve(query, context = {}) {
        if (indexedChunks.length === 0) init();
        const nodeId = context.nodeId;
        const mistakes = context.mistakes || 0;
        const results = {
            strategy: 'Standard Socratic retrieval',
            chunks: []
        };

        if (query && query.length > 5) {
            const matches = search(query, 2);
            if (matches.length > 0) {
                results.chunks.push(...matches);
                results.strategy = 'Keyword overlap search';
            }
        }

        if (nodeId) {
            const node = window.DB.skillNodes.find(n => n.id === nodeId);
            if (node) {
                if (mistakes === 0) {
                    results.strategy = 'Acquaintance/Introductory scaffold';
                    const lessonChunk = indexedChunks.find(c => c.id === `${nodeId}_lesson`);
                    if (lessonChunk) results.chunks.push(lessonChunk);
                } else if (mistakes === 1) {
                    results.strategy = 'Conceptual hint scaffold';
                    const challengeIdx = context.challengeIndex || 0;
                    const challengeChunk = indexedChunks.find(c => c.id === `${nodeId}_challenge_${challengeIdx}`);
                    if (challengeChunk) results.chunks.push(challengeChunk);
                } else if (mistakes >= 2) {
                    results.strategy = 'Foundational prerequisite gap resolution';
                    node.prerequisites.forEach(prereqId => {
                        const prereqLesson = indexedChunks.find(c => c.id === `${prereqId}_lesson`);
                        if (prereqLesson) results.chunks.push(prereqLesson);
                    });
                }
            }
        }

        // De-duplicate chunks
        const uniqueMap = {};
        results.chunks = results.chunks.filter(c => {
            if (uniqueMap[c.id]) return false;
            uniqueMap[c.id] = true;
            return true;
        });

        return results;
    }

    return {
        init,
        search,
        adaptiveRetrieve
    };
})();
