import { Box, Divider, Typography } from "@mui/material";

export default function GTD() {
	return (
		<Box component="div" className="about-page">
			<Typography align="center" variant="h4" component="h1" sx={{ my: 2 }}>
				How to use the app with partially implemented GTD system
			</Typography>
			<Divider />
			<p>
				You can partially implement David Allen's GTD (*Getting Things Done*)
				System using basic features of this app:
			</p>
			<ol style={{ paddingLeft: "1em" }}>
				<li>
					Create a few predefined lists:
					<ul>
						<li>
							📂 PROJECTS (in progress nested tasks; define next action❗)
						</li>
						<li>
							🤷‍♂️ SOMEDAY/MAYBE (potential future projects or one-off tasks)
						</li>
						<li>
							🚀 NEXT ACTIONS (copy 1 from each project + closest one-off tasks)
						</li>
					</ul>
				</li>

				<li>
					When your adding a task:
					<ul>
						<li>if it must be done due some date 👉 add it to your calendar</li>
						<li>if it must be done & takes 2 minutes to do 👉 do it now!</li>
						<li>
							if it must be done, takes more than 2 minutes & is a one-off task
							👉 add it to NEXT ACTIONS list
						</li>
						<li>
							if it must be done, takes more than 2 minutes & is a project (a
							set of tasks) 👇
							<ol>
								<li>
									add the new project name (*de facto* new todo) to PROJECTS
									list
								</li>
								<li>
									define the closest physical next action & add it to NEXT
									ACTIONS list
								</li>
							</ol>
						</li>
						<li>
							if it mustn't be done now/ASAP, but you may be interested to do it
							in the future 👉 add it to SOMEDAY/MAYBE list
						</li>
					</ul>
				</li>
			</ol>

			<p>
				Additionally, you can create separate lists for particular projects
				you're currently working on & put all project-related tasks there.
			</p>

			<p>
				But remember ⚠️ to always define the closest next physical action & to
				duplicate it into NEXT ACTIONS list (you can also mark this tasks as
				next action in parentheses inside a project).
			</p>
		</Box>
	);
}
