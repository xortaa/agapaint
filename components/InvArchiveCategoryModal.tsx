import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { InboxFill } from "react-bootstrap-icons";
import { Category, CategoryData } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

function InvArchiveCategoryModal({
  categoryData,
  setActiveCategories,
}: {
  categoryData: Category;
  setActiveCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const onDelete = (data: Category) => {
    const ArchiveCategory = new Promise((resolve, reject) => {
      axios
        .delete(`/api/category/${categoryData._id}`)
        .then((res) => {
          handleClose();
          setActiveCategories((prev) => prev.filter((category) => category._id !== categoryData._id));
          resolve("Success");
        })
        .catch((error) => {
          console.error("Failed to archive category: ", error);
          reject(error);
        });
    });

    toast.promise(ArchiveCategory, {
      pending: "Archiving Category...",
      success: "Category archived!",
      error: "Failed to archive Category, Please try again.",
    });
  };

  return (
    <>
      <InboxFill size={20} className="text-danger" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Archive Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to archive?
            <br />
            <br />
            Category Name: {categoryData.name}
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => onDelete(categoryData)}>
              Archive
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default InvArchiveCategoryModal;
