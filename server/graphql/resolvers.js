import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {

      Query : {

            hello : () => "Hello world!",
            projects : async () => {

                  const projects = await Project.find({});
                  return projects;

            },
            project : async (_, args) => {

                  const { _id } = args;
                  const project = await Project.findById(_id);
                  return project;

            },

            tasks : async () => {

                  const tasks = await Task.find({});
                  return tasks;

            },

            task : async (_, args) => {

                  const { _id } = args;
                  const task = await Task.findById(_id);
                  return task;
                  
            }

      },

      Mutation : {

            createProject : async (_, args) => {

                  const { name, description } = args;
                   
                  const project = new Project({
                        name,
                        description
                  });

                  const savedProject = await project.save();
                  
                  return savedProject; 
            },

            createTask : async (_, args) => {

                  const { title, projectId } = args;

                  const projectFound = await Project.findById(projectId);

                  if (!projectFound) throw new Error('Project not found');

                  const task = new Task({
                        title,
                        projectId
                  })

                  const savedTask = await task.save();

                  return savedTask;

            },

            deleteProject: async (_, args) => {

                  const { _id } = args;

                  const deletedProject = await Project.findByIdAndDelete(_id);

                  if (!deletedProject) throw new Error('Project not found');

                  await Task.deleteMany({ projectId : deletedProject._id });

                  return deletedProject;

            },

            deleteTask : async (_, args) => {

                  const { _id } = args;

                  const deletedTask = await Task.findByIdAndDelete(_id);

                  if (!deletedTask) throw new Error('Task not found');

                  return deletedTask;

            },

            updateProject : async (_, args) => {

                  const { _id, name, description } = args;

                  const updatedProject = await Project.findByIdAndUpdate(_id, {name, description}, { new : true});

                  if (!updatedProject) throw new Error('Project not found');


                  return updatedProject;

            },

            updateTask : async (_, args) => {

                  const { _id, title, projectId } = args;

                  const updatedTask = await Task.findByIdAndUpdate(_id, {title, projectId}, { new : true});

                  if (!updatedTask) throw new Error('Task not found');

                  return updatedTask;

            }

      }, 

      Project : {

            tasks : async parent => {

                  return await Task.find({ projectId : parent._id });

            }

      },

      Task : {

            project : async parent => {

                  return await Project.findById(parent.projectId)

            }

      }

};