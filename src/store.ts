import { TodoProps } from "./todoList"

type actionProps = 'ADD' | 'EDIT' | 'DELETE' | 'TOGGLECOMPLETED'

const getLocalList = (): TodoProps[] => {
    const storedList = localStorage.getItem("todoList");
    // 檢查 localStorage 是否有該項目，並確保它不為 null
    if (storedList) {
        // 解析 JSON 字串並轉換為 Todo 陣列
        try {
            const parsedList = JSON.parse(storedList);
            return parsedList;
        } catch (error) {
            console.error("解析 JSON 時發生錯誤:", error);
            return [];
        }
    }
    return []; // 如果 localStorage 沒有 todoList，就返回空陣列
}

const setLocalList = ({ action, todo }: { action: actionProps, todo: TodoProps }): void => {
    // 從 localStorage 取得現有的 Todo 陣列
    const storedList = getLocalList();

    // 根據 action 做相應的操作
    switch (action) {
        case "ADD":
            storedList.push(todo); // 添加新的 todo
            break;
        case "EDIT": {
            const editIndex = storedList.findIndex(item => item.id === todo.id);
            if (editIndex !== -1) {
                // 找到對應 id 的 todo，並更新它
                storedList[editIndex] = { ...storedList[editIndex], ...todo };
            }
            break;
        }
        case "DELETE": {
            const deleteIndex = storedList.findIndex(item => item.id === todo.id);
            if (deleteIndex !== -1) {
                // 找到對應 id 的 todo，並刪除它
                storedList.splice(deleteIndex, 1);
            }
            break;
        }
        case "TOGGLECOMPLETED": {
            const toggleIndex = storedList.findIndex(item => item.id === todo.id);
            if (toggleIndex !== -1) {
                // 切換對應 id 的 todo 的 completed 狀態
                storedList[toggleIndex].isCompleted = !storedList[toggleIndex].isCompleted;
            }
            break;
        }
        default:
            break;
    }

    // 更新 localStorage 中的 todoList
    localStorage.setItem("todoList", JSON.stringify(storedList));
}


export { getLocalList, setLocalList }
