const GRIDS = document.querySelectorAll('.grid');
const HEADINGS = document.querySelectorAll('.heading .wrapper .text');
const COLUMNS_SIZE = 7;
const ITEMS_SIZE = 5;

function enterScreen(index) {
    const grid = GRIDS[index];
    const heading = HEADINGS[index];
    const gridColumns = grid.querySelectorAll('.column');

    grid.classList.add('active');

    gridColumns.forEach(element => {
        element.classList.remove('animate-before', 'animate-after');
    })

    heading.classList.remove('animate-before', 'animate-after');
}

function exitScreen(index, exitDelay) {
    const grid = GRIDS[index];
    const heading = HEADINGS[index];
    const gridColumns = grid.querySelectorAll('.column');

    gridColumns.forEach(element => {
        element.classList.add('animate-after');
    })

    heading.classList.add('animate-after');

    setTimeout(() => {
        grid.classList.remove('active');
    }, exitDelay);
}

function setupAnimationCycle({
    initScreenIndex,
    timePerScreen,
    exitDelay
}) {
    const cycleTime = timePerScreen + exitDelay
    let nextIndex = initScreenIndex;

    function nextCycle() {
        const currentIndex = nextIndex

        enterScreen(currentIndex)

        setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen)

        nextIndex = nextIndex >= GRIDS.length - 1 ? 0 : nextIndex + 1
    }

    nextCycle()

    setInterval(nextCycle, cycleTime)
}

setupAnimationCycle({
    initScreenIndex: 0,
    timePerScreen: 2000, // ms
    exitDelay: 200 * COLUMNS_SIZE // ms
});


(function createColumn() {
    let columns = '';
    for (let ic = 0; ic < COLUMNS_SIZE; ic++) {
        let items = '';
        for (let it = 0; it < ITEMS_SIZE; it++) {
            items += `<div class="item"></div>`;
        }

        columns += `<div class="column animate-before">${items}</div>`;
    }

    GRIDS.forEach(element => {
        element.innerHTML = columns;
    });
})();