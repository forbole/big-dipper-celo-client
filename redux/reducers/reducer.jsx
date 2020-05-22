// import { IAnnouncement } from './state'
// import * as announcementActions from './actions'

// // const initialState: IAnnouncement = {
// //   message: 'No announcement...'
// // }

// // export const reducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case announcementActions.UPDATE_ANNOUNCEMENT:
// //       return Object.assign({}, state, { message: action.message })
// //     default: return state
// //   }
// // }
// let lastId = 0;

// export default function reducer(state = [], action){
//   switch(action.type){
//     case 'getBlockHeight': 
//     return[
//       ...state, {
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false
//       }
//     ];
//     case 'updateBlockHeight':
//       return state.filter(bug => bug.id !== action.payload.id);
//     default: 
//     return state;
//   }
// }