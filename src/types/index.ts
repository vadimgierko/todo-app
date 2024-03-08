export interface Store {
	user: User | null;
	lists: Lists | null;
	tasks: Tasks | null;
}

export interface List {
	title: string;
	tasks: {
		[id: string]: true;
	};
}

export interface Lists {
	[id: string]: List;
}

export interface Task {
	completed: boolean;
	value: string;
}

export interface Tasks {
	[id: string]: Task;
}

export interface User {
	email: string | null;
	id: string;
}
