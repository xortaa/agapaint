import React, { useState, useEffect, use } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Pencil, InboxFill } from "react-bootstrap-icons";
import axios from "axios";
import { Category, CategoryData } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function InvUpdateCategoryModal({
  setActiveCategories,
  categoryData,
  id,
}: {
  setActiveCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categoryData: Category;
  id: string;
}) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryData>();

  useEffect(() => {
    axios.get(`/api/category/${categoryData._id}`).then((res) => {
      setCategory(res.data.name);
      for (const [key, value] of Object.entries(res.data)) {
        setValue(key as keyof CategoryData, value as string);
      }
    });
  }, []);

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => setShow(true);

  const onUpdate = (data: Category) => {
    let newData = { ...data };
    const UpdateCategory = new Promise((resolve, reject) => {
      axios
        .patch(`/api/category/${categoryData._id}`, newData)
        .then((res) => {
          handleClose();
          setActiveCategories((prev) =>
            prev.map((category) => (category._id === categoryData._id ? res.data : category))
          );
          resolve("Success");
        })
        .catch((err) => {
          console.error("Failed to update service: ", err);
          reject(err);
        });
    });
    toast.promise(UpdateCategory, {
      pending: "Updating category...",
      success: "Category updated!",
      error: "Failed to update category, Please try again.",
    });
  };

  return (
    <>
      <Pencil onClick={handleShow} size={20} className="text-success me-2" />

      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit(onUpdate)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a category name"
                isInvalid={!!errors.name}
                {...register("name", { required: "Please provide a category name" })}
              />
              <Form.Control.Feedback type="invalid">{errors.name && errors.name.message}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default InvUpdateCategoryModal;
