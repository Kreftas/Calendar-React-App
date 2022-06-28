import { useEffect, useState } from 'react'
import { selectAllTodos } from '../../api/TodoApi'
import { TodoBoxList } from '../../model/todo/TodoBox'
import { ITodo, NullTodo } from '../../model/todo/TodoModel'
import { IList } from './ItemList'

export const TodoList = ({ filter, reload, setReload }: IList) => {
    const [todoList, setTodoList] = useState<[ITodo]>([NullTodo])

    useEffect(() => {
        selectAllTodos(setTodoList)
    }, [filter, reload])

    const Boxes = () => {
        const boxes: any = []
        todoList.map(({ id, description, prio }) => {
            if (id != -1) {
                boxes.push(
                    <TodoBoxList id={id} description={description} prio={prio} sv={setReload} v={reload} key={id} />
                )
            }
        })

        return boxes
    }

    return (
        <Boxes />
    )
}
