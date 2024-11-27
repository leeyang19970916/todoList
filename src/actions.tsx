import dayjs from "dayjs"
import { TodoProps } from "./todoList"
import { setLocalList, getLocalList } from "./store"

type addProps = Pick<TodoProps,'title'|"desc">
export function AddTodo({ title, desc }: addProps) {
    const todo: TodoProps = {
        id: Math.random(),
        title,
        desc,
        startDate: dayjs().format('YYYY/MM/DD'),
        isCompleted: false
    }
    console.log(todo)
    setLocalList("ADD",todo)
}


type editProps = Pick<TodoProps,"id"|'title'|"desc">
export function EditTodo({ id, title, desc }: editProps) {

    setLocalList("EDIT",todo)

}


type deleteProps = Pick<TodoProps,"id">
export function DeleteTodo({ id }: deleteProps) {
    setLocalList("DELETE",id)
}


type toggleCompletedProps = Pick<TodoProps,"id"|"isCompleted">
export function toggleCompleted({id,isCompleted}:toggleCompletedProps) {

    return
}