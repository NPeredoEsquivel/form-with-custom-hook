import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-https";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const createTaskTransformer = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url: '"/tasks.json"',
        method: "POST",
        body: { text: taskText },
        header: {
          "Content-Type": "application/json",
        },
      },
      createTaskTransformer.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
