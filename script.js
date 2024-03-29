currentId();
// const identify = getCounterId();
let counterEl;
function cl() {
  counterEl = document.getElementById(`counter_${ID}`);
}
cl();
myFn();

const incrementEl2 = document.getElementById(clickedEventId);

const decrementEl2 = document.getElementById(decrementId);
const counterEl2 = document.getElementById(counterId);

const resetEl = document.getElementById("reset");

const addEl = document.getElementById("add");

// initial state
let initialState = [
  {
    id: "ir73pf2prxh",
    value: 0,
  },
];

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";
const ADD = "add";

// action creators
const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: { id, value },
  };
};

const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: { id, value },
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

const add = (id, value) => {
  return {
    type: ADD,
    payload: { id, value },
  };
};
// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    const exists = state.filter((i) => i.id === action.payload.id);
    const rest = state.filter((rId) => rId.id !== action.payload.id);

    return [
      {
        ...exists[0],
        value: exists[0].value + action.payload.value,
      },
      ...rest,
    ];
  } else if (action.type === DECREMENT) {
    const exists = state.filter((i) => i.id === action.payload.id);
    const rest = state.filter((rId) => rId.id !== action.payload.id);

    return [
      {
        ...exists[0],
        value: exists[0].value - action.payload.value,
      },
      ...rest,
    ];
  } else if (action.type === RESET) {
    const exists = state.map((i) => {
      return { id: i.id, value: 0 };
    });
    getCounterId();

    return (initialState = [...exists]);
  } else if (action.type === ADD) {
    addCounter(0);
    myFn();
    return (initialState = [
      ...state,
      {
        id: action.payload.id,
        value: action.payload.value,
      },
    ]);
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state[0].value.toString();
};

// update UI initially
render();
store.subscribe(render);

// find id and if not found create one
const isExists = initialState.find((eId) => eId.id);

function myFn() {
  uId = Math.random().toString(36).slice(2);
  clickedEventId = `increment_${uId}`;
  decrementId = `decrement_${uId}`;
  counterId = `counter_${uId}`;
  cSection = `cSection_${uId}`;
}

// dynamic id handle
document.querySelectorAll("[id^='increment']").forEach(function () {
  this.addEventListener("click", (e) => favToggle(e));

  // getCounterId();
});

function currentId(i = "ir73pf2prxh") {
  ID = i;
  return ID;
}

function favToggle(e) {
  const clickedEventId = e.target.id.slice(10);
  currentId(clickedEventId);
  cl();

  // store dispatch
  const pointTarget = e.target.id.slice(0, 9);
  if (pointTarget === "increment") {
    store.dispatch(increment(ID, 10));
  } else if (pointTarget === "decrement") {
    store.dispatch(decrement(ID, 5));
  }
}

function getCounterId(clickedEventId) {
  const cElem = document.querySelectorAll("[id^='counter']").forEach((i) => (i.innerText = 0));
}

resetEl.addEventListener("click", () => {
  store.dispatch(reset());
});

addEl.addEventListener("click", () => {
  store.dispatch(add(uId, 0));
});

function addCounter(c) {
  const counterSection = document.getElementById("c_section");

  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", `${cSection}`);
  newDiv.innerHTML = `
        <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
          <div id="${counterId}" class="text-2xl font-semibold">${c}</div>
          <div class="flex space-x-3">
            <button id="${clickedEventId}" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">Increment</button>
            <button id="${decrementId}" class="bg-red-400 text-white px-3 py-2 rounded shadow">Decrement</button>
          </div>
        </div>
    `;

  counterSection.appendChild(newDiv);
}
