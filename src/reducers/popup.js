import {
  FETCH_TASKLIST_LIST_START, FETCH_TASKLIST_LIST_SUCCESS, FETCH_TASKLIST_LIST_ERROR,
  EDIT_TASK_TITLE, EDIT_TASK_CONTENT, EDIT_TASK_REMINDER_DATETIME, EDIT_SELECTED_TASKLIST, EDIT_BOOKMARKED,
  CREATE_TASK_ERROR, CREATE_TASK_START, CREATE_TASK_SUCCESS, RESET_TASK, EDIT_IMPORTANCE,
} from '../constants/PopupTypes';

const defaultTask = () => ({
  body: {
    content: '',
    contentType: 'text',
  },
  reminderDateTime: {
    dateTime: '',
    timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  importance: 'low',
  title: '',
});

const initialState = {
  taskCreating: false,
  tasklistListLoading: false,

  task: defaultTask(),
  tasklistList: [],
  selectedTasklistId: '',
  bookmarked: false,
};

function popup(state = initialState, action) {
  switch (action.type) {
    // FETCH_TASKLIST_LIST
    case FETCH_TASKLIST_LIST_START: {
      return { ...state, tasklistListLoading: true };
    }
    case FETCH_TASKLIST_LIST_SUCCESS: {
      const { tasklistList } = action.payload;
      const selectedTasklistId = (tasklistList[0] || {}).id || '';
      return {
        ...state, tasklistListLoading: false, tasklistList, selectedTasklistId,
      };
    }
    case FETCH_TASKLIST_LIST_ERROR: {
      return { ...state, tasklistListLoading: false };
    }

    // EDIT_TASK
    case EDIT_TASK_TITLE: {
      const { title } = action.payload;
      return { ...state, task: { ...state.task, title } };
    }
    case EDIT_TASK_CONTENT: {
      const { content } = action.payload;
      return { ...state, task: { ...state.task, body: { ...state.task.body, content } } };
    }
    case EDIT_TASK_REMINDER_DATETIME: {
      const { dateTime } = action.payload;
      return { ...state, task: { ...state.task, reminderDateTime: { ...state.task.reminderDateTime, dateTime } } };
    }
    case EDIT_SELECTED_TASKLIST: {
      const { selectedTasklistId } = action.payload;
      return { ...state, selectedTasklistId };
    }
    case EDIT_IMPORTANCE: {
      const { importance } = action.payload;
      return { ...state, task: { ...state.task, importance } };
    }
    case EDIT_BOOKMARKED: {
      const { bookmarked } = action.payload;
      return { ...state, bookmarked };
    }

    // CREATE_TASK
    case CREATE_TASK_START: {
      return { ...state, taskCreating: true };
    }
    case CREATE_TASK_SUCCESS: {
      return {
        ...state,
        task: defaultTask(),
        taskCreating: false,
      };
    }
    case CREATE_TASK_ERROR: {
      return {
        ...state,
        taskCreating: false,
        disableNewTaskEdit: false,
      };
    }
    case RESET_TASK: {
      return { ...state, task: defaultTask() };
    }

    default:
      return state;
  }
}

export default popup;
