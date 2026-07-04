window.BattleSystem = (function() {
    let currentStep = 0;
    let isProcessing = false;
    let isCurrentChallengeSolved = false;
    let currentBattleNodeId = 'logprop';
    let currentChallenges = [];
    let battleHistory = [];
    let currentMistakes = 0;
    let solvedCount = 0;
    let battleStartTime = null;

    // Resets the initial battle state parameters
    function init() {
        currentStep = 0;
        currentMistakes = 0;
        solvedCount = 0;
        isProcessing = false;
        isCurrentChallengeSolved = false;
        battleHistory = [];
        battleStartTime = null;
    }

    // Loads the selected study node and resets its starting challenges step
    function startBattle(nodeId) {
        currentBattleNodeId = nodeId;
        const profile = window.ProgressionManager.getProfile();
        const startStep = (profile && profile.nodes[nodeId]) ? profile.nodes[nodeId].startStep : 0;
        currentStep = Math.min(startStep, (window.DB.skillNodes.find(n => n.id === nodeId)?.challenges.length || 1) - 1);
        const node = window.DB.skillNodes.find(n => n.id === nodeId);
        currentChallenges = node && node.challenges ? node.challenges : [];
        isCurrentChallengeSolved = false;
        return { node, challenges: currentChallenges };
    }

    // Sets study timers and clears session progress counters
    function resetBattle() {
        currentMistakes = 0;
        isProcessing = false;
        isCurrentChallengeSolved = false;
        battleHistory = [];
        battleStartTime = Date.now();
    }

    // Appends a user message to the conversation history
    function recordUserInput(text) {
        battleHistory.push({ role: 'user', content: text });
    }

    // Appends an assistant message to the conversation history
    function recordAIResponse(content) {
        battleHistory.push({ role: 'assistant', content });
    }

    // Evaluates accuracy and logs mistakes or solves accordingly
    function recordAttempt(isCorrect) {
        if (isCorrect) {
            isCurrentChallengeSolved = true;
            solvedCount++;
            return { status: 'solved', isComplete: isBattleComplete() };
        } else {
            currentMistakes++;
            return { status: 'retry', isComplete: false };
        }
    }

    // Clears the active chat dialogue log history
    function clearHistory() {
        battleHistory = [];
    }

    // Advances step count with a potential jump index if first task was solved perfectly
    function advanceToNextChallenge(forceSkip = false) {
        if (isCurrentChallengeSolved || forceSkip) {
            const wasDiagnostic = (currentStep === 0);
            const isPerfect = (currentMistakes === 0);
            if (!forceSkip && wasDiagnostic && isPerfect && currentChallenges.length > 3) {
                currentStep = 3;
            } else {
                currentStep++;
            }
            isCurrentChallengeSolved = false;
            currentMistakes = 0;
            clearHistory();
            return true;
        }
        return false;
    }

    // Returns the active step challenge metadata
    function getCurrentChallenge() {
        return currentChallenges[currentStep] || null;
    }

    // Returns the next sequential challenge metadata
    function getNextChallenge() {
        return currentChallenges[currentStep + 1] || null;
    }

    // Checks if the user has successfully solved the final question
    function isBattleComplete() {
        return currentStep >= currentChallenges.length - 1 && isCurrentChallengeSolved;
    }

    // Dispatches results to ProgressionManager to save XP and update mastery score
    function finalizeBattle() {
        const elapsedSeconds = Math.round((Date.now() - battleStartTime) / 1000);
        if (!isBattleComplete() && currentStep < currentChallenges.length) return null;
        return window.ProgressionManager.completeQuest(
            currentBattleNodeId,
            currentMistakes,
            elapsedSeconds,
            solvedCount,
            currentChallenges.length
        );
    }

    // Returns a copy of the current state metrics
    function getState() {
        return {
            currentStep,
            currentMistakes,
            isProcessing,
            isCurrentChallengeSolved,
            currentBattleNodeId,
            currentChallenges,
            battleHistory: [...battleHistory],
            battleStartTime,
            totalChallenges: currentChallenges.length
        };
    }

    return {
        init,
        startBattle,
        resetBattle,
        recordUserInput,
        recordAIResponse,
        recordAttempt,
        clearHistory,
        advanceToNextChallenge,
        getCurrentChallenge,
        getNextChallenge,
        isBattleComplete,
        finalizeBattle,
        getState,
        get isProcessing() { return isProcessing; },
        set isProcessing(val) { isProcessing = val; },
        get currentMistakes() { return currentMistakes; },
        get currentStep() { return currentStep; },
        get battleHistory() { return battleHistory; },
        set battleHistory(val) { battleHistory = val; }
    };
})();
