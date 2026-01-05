const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function handleSort() {
    const input = document.getElementById('inputValues').value;
    const algo = document.getElementById('algoSelect').value;
    if (!input) return;

    let arr = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    render(arr);

    if (algo === 'bubble') await bubbleSort(arr);
    else if (algo === 'selection') await selectionSort(arr);
    else if (algo === 'insertion') await insertionSort(arr);
    // Note: Quick/Merge/Heap require more complex state management for visualization
}

function render(arr, actives = [], sorted = []) {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';
    arr.forEach((val, i) => {
        const div = document.createElement('div');
        div.className = 'bubble';
        if (actives.includes(i)) div.classList.add('active');
        if (sorted.includes(i)) div.classList.add('sorted');
        div.innerText = val;
        container.appendChild(div);
    });
}

// Example: Selection Sort Implementation
async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            render(arr, [i, j]);
            await sleep(400);
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        render(arr, [], [...Array(i + 1).keys()]);
    }
}

// Example: Bubble Sort Implementation
async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            render(arr, [j, j + 1]);
            await sleep(300);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                render(arr, [j, j + 1]);
            }
        }
    }
    render(arr, [], [...Array(arr.length).keys()]);
}

// Example: Insertion Sort Implementation
async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            render(arr, [j, j + 1]);
            await sleep(400);
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        render(arr, [j + 1]);
    }
    render(arr, [], [...Array(arr.length).keys()]);
}
