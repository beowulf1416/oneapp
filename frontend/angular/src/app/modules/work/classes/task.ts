export class Task {
    constructor(
        public name: string,
        public description: string,
        public actual_start: Date,
        public actual_end: Date,
        public projected_start: Date,
        public projected_end: Date,
        public parent_task: Task,
        public child_tasks: Array<Task>
    ) {}
}
