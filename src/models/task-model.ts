import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
   {
    id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, requiered: true},
    completed: {type: Boolean, requiered: true, default: false},
    images: {
        type: [String],
        required: true
    }
   },
   { timestamps: true }  //timestamps indica a data que a tarefa foi criada e atualizada, com a biblioteca mongoose
   );

   const TaskModel = mongoose.model('tasks', taskSchema);

   export default TaskModel;