import Scrollable from "./components/screen-wrappers/Scrollable";
import FormScreen from "./components/FormScreen";

export default function App() {
  const handleRefresh = async () => {
    console.log("Atualizando...");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Atualizado!");
  };

  return (
    <Scrollable backgroundColor="#fff870" onRefresh={handleRefresh} gap={16}>
      <FormScreen />
    </Scrollable>
  );
}
