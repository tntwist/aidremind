export const tasksService = {
    getTaskActivities,
    getTask,
    getTaskActivitie
}

function getTaskActivities() {
    const items = [
        { id: 1, task_id: 1, task: null, user_id: 1, due_to_date: "2020-03-21T19:00:00.000Z", done_date: null },
        { id: 2, task_id: 1, task: null, user_id: 1, due_to_date: "2020-03-22T07:00:00.000Z", done_date: null },
        { id: 3, task_id: 2, task: null, user_id: 1, due_to_date: "2020-03-22T18:00:00.000Z", done_date: null },
    ]

    items.map(item => { item.task = getTask(item.task_id) })

    return items;
}

function getTask(id) {
    const items = [
        { id: 1, category_id: 1, title: "Call", description: "Projekt Update Call", frequenceny: "12h", start_date: "2020-03-21T19:00:00.000Z", end_date: "2020-03-22T07:00:00.000Z" },
        { id: 2, category_id: 1, title: "Projekt Abgabe", description: "Abgabe der Projektdokumentation für den Hackathon", frequenceny: "0", start_date: "2020-03-22T18:00:00.000Z", end_date: null }
    ]
    let item = items.find((element) => { return element.id == id })
    return item;
}

function getTaskActivitie(id) {
    const items = [
        { id: 1, task_id: 1, task: null, user_id: 1, due_to_date: "2020-03-21T19:00:00.000Z", done_date: null },
        { id: 2, task_id: 1, task: null, user_id: 1, due_to_date: "2020-03-22T07:00:00.000Z", done_date: null },
        { id: 3, task_id: 2, task: null, user_id: 1, due_to_date: "2020-03-22T18:00:00.000Z", done_date: null },
    ]
    let item = items.find((element) => { return element.id == id })
    return item;
}