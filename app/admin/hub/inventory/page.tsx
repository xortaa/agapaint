"use client";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  FormControl,
  Button,
  Badge,
  Table,
  Card,
  Pagination,
} from "react-bootstrap";

import AdminHeader from "@/components/AdminHeader";
import InvAddLogModal from "@/components/InvAddLogModal";
import InvAddCatModal from "@/components/InvAddCatModal";
import InvUpdateCatModal from "@/components/InvUpdateCatModal";
import InvArchiveCategoryModal from "@/components/InvArchiveCategoryModal";
import InvAddMaterialModal from "@/components/InvAddMaterialModal";
import InvUpdateMaterialModal from "@/components/InvUpdateMaterialModal";
import InvArchiveMaterialModal from "@/components/InvArchiveMaterialModal";
import PlaceholderRow from "@/components/PlaceholderRow";

import {
  Search,
  Funnel,
  PlusLg,
  Pencil,
  InboxFill,
  SortAlphaDownAlt,
  SortAlphaDown,
  SortNumericDownAlt,
  SortNumericDown,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import Link from "@/components/Link";

import { Category, Material, Log } from "@/types";
import axios from "axios";
import ToastPromise from "@/components/ToastPromise";
import NoRecordRow from "@/components/NoRecordRow";

function manageInventory() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<Material[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [matLoading, setMatLoading] = useState(true);
  const [logLoading, setLogLoading] = useState(true);

  useEffect(() => {
    const getMaterials = () => {
      axios.get("/api/material").then((res) => {
        setAllMaterials(res.data);
        setActiveMaterials(res.data.filter((material: Material) => material.isArchived === false));
        setMatLoading(false);
      });
    };

    const getCategories = () => {
      axios.get("/api/category").then((res) => {
        setActiveCategories(res.data.filter((category: Category) => category.isArchived === false));
        setAllCategories(res.data);
        setCatLoading(false);
      });
    };

    const getLogs = () => {
      setLogLoading(true);
      axios.get("/api/log").then((res) => {
        setLogs(res.data);
        setLogLoading(false);
      });
    };

    getMaterials();
    getCategories();
    getLogs();
  }, []);

  // Pagination, Search, Filter and Sort
  // search function
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setCurrentPageMat(1);
  };
  const filteredCategories = activeCategories.filter((category) =>
    Object.values(category).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredMaterials = activeMaterials.filter(
    (material) =>
      Object.values(material).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      material.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = logs.filter(
    (log) =>
      Object.values(log).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort function Category
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Check if the values are numeric
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      // Convert to string if not already
      if (typeof aValue !== "string") aValue = String(aValue);
      if (typeof bValue !== "string") bValue = String(bValue);

      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  // Sort function Material
  const [sortFieldMat, setSortFieldMat] = useState(null);
  const [sortDirectionMat, setSortDirectionMat] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const handleSortMat = (field) => {
    setSortFieldMat(field);
    setSortDirectionMat(sortDirectionMat === "asc" ? "desc" : "asc");
  };
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    if (!sortFieldMat) return 0;

    let aValue = sortFieldMat.includes(".")
      ? sortFieldMat.split(".").reduce((obj, key) => obj[key], a)
      : a[sortFieldMat];
    let bValue = sortFieldMat.includes(".")
      ? sortFieldMat.split(".").reduce((obj, key) => obj[key], b)
      : b[sortFieldMat];

    // Check if the values are numeric
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortDirectionMat === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      // Convert to string if not already
      if (typeof aValue !== "string") aValue = String(aValue);
      if (typeof bValue !== "string") bValue = String(bValue);

      return sortDirectionMat === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  // Sort function Log
  const [sortFieldLog, setSortFieldLog] = useState(null);
  const [sortDirectionLog, setSortDirectionLog] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const handleSortLog = (field) => {
    setSortFieldLog(field);
    setSortDirectionLog(sortDirectionLog === "asc" ? "desc" : "asc");
    setCurrentPageLog(1);
  };
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (!sortFieldLog) return 0;

    let aValue = sortFieldLog.includes(".")
      ? sortFieldLog.split(".").reduce((obj, key) => obj[key], a)
      : a[sortFieldLog];
    let bValue = sortFieldLog.includes(".")
      ? sortFieldLog.split(".").reduce((obj, key) => obj[key], b)
      : b[sortFieldLog];

    // Convert transactionDate to string
    if (sortFieldLog === "transactionDate") {
      aValue = new Date(aValue).toISOString();
      bValue = new Date(bValue).toISOString();
    }

    // Check if the values are numeric
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortDirectionLog === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      // Convert to string if not already
      if (typeof aValue !== "string") aValue = String(aValue);
      if (typeof bValue !== "string") bValue = String(bValue);

      return sortDirectionLog === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); //set the limit of items per page
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  // Pagination for allCategories
  const currentCategories = sortedCategories.slice(indexOfFirstItem, indexOfLastItem);

  const categoryPages = [];
  for (let i = 1; i <= Math.ceil(filteredCategories.length / itemsPerPage); i++) {
    if (
      i === 1 ||
      i === Math.ceil(filteredCategories.length / itemsPerPage) ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      categoryPages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      categoryPages.push(<Pagination.Ellipsis />);
    }
  }

  // Pagination for Materials
  const [currentPageMat, setCurrentPageMat] = useState(1);
  const [itemsPerPageMat, setItemsPerPageMat] = useState(8); //set the limit of items per page
  const indexOfLastItemMat = (currentPageMat - 1) * itemsPerPageMat;
  const indexOfFirstItemMat = indexOfLastItemMat;
  
  const reversedMaterials = [...sortedMaterials].reverse();
  const currentMaterials = reversedMaterials.slice(indexOfFirstItemMat, indexOfFirstItemMat + itemsPerPageMat);

  const totalPagesMat = Math.ceil(reversedMaterials.length / itemsPerPageMat);
  const materialPages = [];
  for (let i = 1; i <= totalPagesMat; i++) {
    // Always render the first page, the last page, the current page, and two pages around the current page
    if (i === 1 || i === totalPagesMat || i === currentPageMat || i === currentPageMat - 1 || i === currentPageMat + 1) {
      materialPages.push(
        <Pagination.Item key={i} active={i === currentPageMat} onClick={() => setCurrentPageMat(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === 2 || i === currentPageMat + 2) {
      materialPages.push(<Pagination.Ellipsis key={i} />);
    }
  }

  // Pagination for logs
  const [currentPageLog, setCurrentPageLog] = useState(1);
  const [itemsPerPageLog, setItemsPerPageLog] = useState(10); //set the limit of items per page
  const indexOfLastItemLog = (currentPageLog - 1) * itemsPerPageLog;
  const indexOfFirstItemLog = indexOfLastItemLog;
  const reversedLogs = [...sortedLogs].reverse();
  const currentLogs = reversedLogs.slice(indexOfFirstItemLog, indexOfFirstItemLog + itemsPerPageLog);

  const totalPagesLog = Math.ceil(reversedLogs.length / itemsPerPageLog);
  const logPages = [];
  for (let i = 1; i <= totalPagesLog; i++) {
    // Always render the first page, the last page, the current page, and two pages around the current page
    if (i === 1 || i === totalPagesLog || i === currentPageLog || i === currentPageLog - 1 || i === currentPageLog + 1) {
      logPages.push(
        <Pagination.Item key={i} active={i === currentPageLog} onClick={() => setCurrentPageLog(i)}>
          {i}
        </Pagination.Item>
      );
    } else if (i === 2 || i === currentPageLog + 2) {
      logPages.push(<Pagination.Ellipsis key={i} />);
    }
  }

  return (
    <main className="agapaint-bg">
      <Container fluid className="p-4 min-vh-100">
        <Row>
          {/* Toast Component */}
          <ToastPromise />

          {/* Header Row */}
          <AdminHeader title="Manage Inventory" subtitle="View and track your inventory materials" />

          {/* Search Row */}
          <Col>
            <Row className="mt-2 mb-4" sm={8}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <InputGroup className="w-25">
                  <InputGroup.Text id="basic-addon1">
                    <Search size={20} />
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={handleSearchChange}
                  />
                </InputGroup>

                {/* Add Category Modal */}
                <div className="ms-auto d-flex gap-2">
                  <InvAddCatModal setActiveCategories={setActiveCategories} />
                  {/* Add Material Modal */}
                  <InvAddMaterialModal
                    setActiveMaterials={setActiveMaterials}
                    disabled={!activeCategories.length}
                    activeCategories={activeCategories}
                  />
                  {/* Add Log Modal */}
                  <InvAddLogModal
                    disabled={!activeMaterials.length}
                    activeMaterials={activeMaterials}
                    setLogs={setLogs}
                    setActiveMaterials={setActiveMaterials}
                    setAllMaterials={setAllMaterials}
                  />
                </div>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className="mb-4">
          {/* Categories Table */}
          <Col xs={4}>
            <div className="d-flex align-items-center">
              <h6 className="me-auto fw-bold agapaint-yellow mb-0">Categories</h6>
              <div className="d-flex justify-content-end align-items-center">
                {/* Pagination */}
                <Pagination className="secondary-pagination mb-2" size="sm">
                  <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                  {categoryPages}
                  <Pagination.Next
                    disabled={currentPage === categoryPages.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </Pagination>
              </div>
            </div>
            <Card className="border-0" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        Category Name
                        <span onClick={() => handleSort("name")}>
                          {sortField === "name" ? (
                            sortDirection === "asc" ? (
                              <SortAlphaDownAlt className="text-danger" />
                            ) : (
                              <SortAlphaDown className="text-success" />
                            )
                          ) : (
                            <SortAlphaDownAlt className="text-secondary" />
                          )}
                        </span>
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catLoading ? (
                      // Placeholder Component
                      <PlaceholderRow col="3" />
                    ) : currentCategories.length > 0 ? (
                      [...currentCategories].reverse().map((category: Category, index) => (
                        <tr key={category._id}>
                          <td>{currentCategories.length - index}</td>
                          <td>{category.name}</td>
                          <td>
                            <InvUpdateCatModal
                              setActiveCategories={setActiveCategories}
                              categoryData={category}
                              id={category._id}
                            />
                            <InvArchiveCategoryModal
                              setActiveCategories={setActiveCategories}
                              categoryData={category}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NoRecordRow colSpan={3} message="Add a Category now to start your inventory journey" />
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {/* Materials Table */}
          <Col xs={8}>
            <div className="d-flex align-items-center">
              <h6 className="me-auto fw-bold agapaint-yellow mb-0">Current Materials Stock</h6>
              <div className="d-flex justify-content-end align-items-center">
                {/* Pagination */}
                <Pagination className="secondary-pagination mb-2" size="sm">
                  <Pagination.Prev
                    disabled={currentPageMat === 1}
                    onClick={() => setCurrentPageMat(currentPageMat - 1)}
                  />
                  {materialPages}
                  <Pagination.Next
                    disabled={currentPageMat === materialPages.length}
                    onClick={() => setCurrentPageMat(currentPageMat + 1)}
                  />
                </Pagination>
              </div>
            </div>
            <Card className="border-0" style={{ borderRadius: "10px" }}>
              <Card.Body className="p-2 pb-0 pt-0">
                <Table hover className="align-middle responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        Material Name
                        <span onClick={() => handleSortMat("name")}>
                          {sortFieldMat === "name" ? (
                            sortDirectionMat === "asc" ? (
                              <SortAlphaDownAlt className="text-danger" />
                            ) : (
                              <SortAlphaDown className="text-success" />
                            )
                          ) : (
                            <SortAlphaDownAlt className="text-secondary" />
                          )}
                        </span>
                      </th>
                      <th>
                        Category
                        <span onClick={() => handleSortMat("category.name")}>
                          {sortFieldMat === "category.name" ? (
                            sortDirectionMat === "asc" ? (
                              <SortAlphaDownAlt className="text-danger" />
                            ) : (
                              <SortAlphaDown className="text-success" />
                            )
                          ) : (
                            <SortAlphaDownAlt className="text-secondary" />
                          )}
                        </span>
                      </th>
                      <th>
                        Current Stock
                        <span onClick={() => handleSortMat("quantity")}>
                          {sortFieldMat === "quantity" ? (
                            sortDirectionMat === "asc" ? (
                              <SortNumericDownAlt className="text-danger" />
                            ) : (
                              <SortNumericDown className="text-success" />
                            )
                          ) : (
                            <SortNumericDownAlt className="text-secondary" />
                          )}
                        </span>
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Placeholder Component */}
                    {matLoading ? (
                      <PlaceholderRow col="5" />
                    ) : currentMaterials.length > 0 ? (
                      [...currentMaterials].map((material: Material, index) => (
                        <tr key={material._id}>
                          <td>{currentMaterials.length - index}</td>
                          <td>{material.name}</td>
                          <td>
                            <Badge pill bg="warning" text="dark">
                              {material.category.name}
                            </Badge>
                          </td>
                          <td>{material.quantity}</td>
                          <td>
                            <InvUpdateMaterialModal
                              setActiveMaterials={setActiveMaterials}
                              materialData={material}
                              id={material._id}
                              activeCategories={activeCategories}
                            />
                            <InvArchiveMaterialModal setMaterials={setActiveMaterials} materialData={material} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NoRecordRow colSpan={5} message="Add a material now to track your stocks" />
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Inventory Log */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center">
              <h6 className="me-auto fw-bold agapaint-yellow mb-0">Logs</h6>
              <div className="d-flex justify-content-end align-items-center">
                {/* Pagination */}
                <Pagination className="secondary-pagination mb-2" size="sm">
                  <Pagination.Prev
                    disabled={currentPageLog === 1}
                    onClick={() => setCurrentPageLog(currentPageLog - 1)}
                  />
                  {logPages}
                  <Pagination.Next
                    disabled={currentPageLog === logPages.length}
                    onClick={() => setCurrentPageLog(currentPageLog + 1)}
                  />
                </Pagination>
              </div>
            </div>
            <Card className="border-0 rounded">
              <Table hover className="align-middle responsive">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      Type
                      <span onClick={() => handleSortLog("transactionType")}>
                        {sortFieldLog === "transactionType" ? (
                          sortDirectionLog === "asc" ? (
                            <SortAlphaDownAlt className="text-danger" />
                          ) : (
                            <SortAlphaDown className="text-success" />
                          )
                        ) : (
                          <SortAlphaDownAlt className="text-secondary" />
                        )}
                      </span>
                    </th>
                    <th>
                      Material Name
                      <span onClick={() => handleSortLog("material.name")}>
                        {sortFieldLog === "material.name" ? (
                          sortDirectionLog === "asc" ? (
                            <SortAlphaDownAlt className="text-danger" />
                          ) : (
                            <SortAlphaDown className="text-success" />
                          )
                        ) : (
                          <SortAlphaDownAlt className="text-secondary" />
                        )}
                      </span>
                    </th>
                    <th>
                      Qty
                      <span onClick={() => handleSortLog("transactionQuantity")}>
                        {sortFieldLog === "transactionQuantity" ? (
                          sortDirectionLog === "asc" ? (
                            <SortNumericDownAlt className="text-danger" />
                          ) : (
                            <SortNumericDown className="text-success" />
                          )
                        ) : (
                          <SortNumericDownAlt className="text-secondary" />
                        )}
                      </span>
                    </th>
                    <th>
                      Current Stock
                      <span onClick={() => handleSortLog("material.quantity")}>
                        {sortFieldLog === "material.quantity" ? (
                          sortDirectionLog === "asc" ? (
                            <SortNumericDownAlt className="text-danger" />
                          ) : (
                            <SortNumericDown className="text-success" />
                          )
                        ) : (
                          <SortNumericDownAlt className="text-secondary" />
                        )}
                      </span>
                    </th>
                    <th>Notes</th>
                    <th>
                      Date
                      <span onClick={() => handleSortLog("transactionDate")}>
                        {sortFieldLog === "transactionDate" ? (
                          sortDirectionLog === "asc" ? (
                            <SortNumericDownAlt className="text-danger" />
                          ) : (
                            <SortNumericDown className="text-success" />
                          )
                        ) : (
                          <SortNumericDownAlt className="text-secondary" />
                        )}
                      </span>
                    </th>
                    <th>Log By</th>
                  </tr>
                </thead>
                <tbody>
                  {logLoading ? (
                    <PlaceholderRow col="8" />
                  ) : currentLogs.length > 0 ? (
                    [...currentLogs].map((log, index) => {
                      const mergedMaterials = [
                        ...allMaterials,
                        ...activeMaterials.filter(
                          (activeMaterial) => !allMaterials.some((material) => material._id === activeMaterial._id)
                        ),
                      ];
                      const material = mergedMaterials.find((material) => material._id === log.material._id);
                      return (
                        <tr key={log._id}>
                          <td>{logs.length - index}</td>
                          <td>
                            <Badge bg={log.transactionType === "IN" ? "success" : "danger"} pill>
                              {log.transactionType}
                            </Badge>
                          </td>
                          <td>{material ? material.name : "Material not found"}</td>
                          <td>{log.transactionQuantity}</td>
                          <td>{log.stock}</td>
                          <td>{log.notes}</td>
                          <td>
                            {new Date(log.transactionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td>{log.updatedBy}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <NoRecordRow colSpan={8} message="Add a log to track the ins and out of your materials" />
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default manageInventory;
