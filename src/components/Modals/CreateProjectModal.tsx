import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const CreateProjectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-5 top-5 z-50">Crear proyecto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vamos a crear tu proyecto!</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
