// select dom elements
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const counterEl = document.getElementById("counter");
myFn();

const incrementEl2 = document.getElementById(incrementId);
console.log(incrementId);

const decrementEl2 = document.getElementById(decrementId);
const counterEl2 = document.getElementById(counterId);

const resetEl = document.getElementById("reset");

const addEl = document.getElementById("add");

// initial state
let initialState = [
  {
    id: 1,
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

const reset = (id, value) => {
  return {
    type: RESET,
    payload: { id, value },
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
    // console.log({ exists, rest }, action.payload.id);

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
    const exists = state.filter((i) => i.id);

    return [
      {
        ...exists[0],
        value: action.payload.value,
      },
    ];
  } else if (action.type === ADD) {
    addCounter(0);
    myFn();
    console.log(uId);
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

console.log({ incrementId }, { uId });
console.log({ initialState });

function myFn() {
  uId = Math.random().toString(36).slice(2);
  incrementId = `increment_${uId}`;
  decrementId = `decrement_${uId}`;
  counterId = `counter_${uId}`;
  cSection = `cSection_${uId}`;
}

// button click listeners
incrementEl.addEventListener("click", () => {
  console.log({ incrementEl });

  store.dispatch(increment(isExists.id, 5));
});
decrementEl.addEventListener("click", () => {
  store.dispatch(decrement(isExists.id, 10));
});

// {
//   incrementEl2 &&
//     incrementEl2.addEventListener("click", () => {
//       console.log(incrementEl2);
//       store.dispatch(increment(isExists.id, 5));
//     });
// }
// {
//   decrementEl2 &&
//     decrementEl2.addEventListener("click", () => {
//       store.dispatch(decrement(isExists.id, 10));
//     });
// }

resetEl.addEventListener("click", () => {
  store.dispatch(reset(isExists.id, 0));
});

addEl.addEventListener("click", () => {
  store.dispatch(add(uId, 0));
  console.log(initialState);
  console.log(uId);
});

function addCounter(c) {
  const counterSection = document.getElementById("counter-section");

  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", `${cSection}`);
  newDiv.innerHTML = `
        <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
          <div id="${counterId}" class="text-2xl font-semibold">${c}</div>
          <div class="flex space-x-3">
            <button id="${incrementId}" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">Increment</button>
            <button id="${decrementId}" class="bg-red-400 text-white px-3 py-2 rounded shadow">Decrement</button>
          </div>
        </div>
    `;

  counterSection.appendChild(newDiv);
}
