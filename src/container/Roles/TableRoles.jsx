import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import * as RoleServices from '../../services/roleServices';
import ModalDelete from "./ModalDelete";
import {toast} from "react-toastify";
import ReactPaginate from 'react-paginate';
const TableRoles = forwardRef((props, ref) => {
    const [roles, setRoles] = useState([]);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataRole, setDataRole] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [limitPerPage, setLimitPerPage] = useState(3);
    const [totalPage, setTotalPage] = useState(0);
    const fetchAllRoles = async () => {
        const response = await RoleServices.getAllRoles(limitPerPage, currentPage);
        if(response && response.EC === 0) {
            setRoles(response && response?.DT ? response.DT.roles : []);
            setTotalPage(response?.DT?.totalPage);
        }
    }
    const handleOpenModalDelete = (role) => {
        setIsShowModalDelete(true);
        setDataRole(role);
    }
    const handleCloseModalDelete = () => {
        setDataRole({});
        setIsShowModalDelete(false);
    }
    const handleDeleteRole = async (roleId) => {
        const response = await RoleServices.deleteRole(roleId);
        if(response && response.EC === 0) {
            toast.success(response.EM);
            fetchAllRoles();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }
    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    }
    useEffect(() => {
        fetchAllRoles();
    }, [currentPage]);
    // useEffect(() => {
    //     fetchAllRoles();
    // }, [currentPage])
    useImperativeHandle(ref, () => ({
        async fetchAllRolesAgain(){
            const response = await RoleServices.getAllRoles(limitPerPage, currentPage);
            if(response && response.EC === 0) {
                setRoles(response && response?.DT ? response.DT : []);
            }
        }
    }));
    return (
        <div className="table-container">
            <div className="table-body">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">URL</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles && roles.length > 0 ?
                                <>
                                    {
                                        roles.map((role, index) => (
                                            <tr key={role.id} className="align-middle">
                                                <td>{index + (currentPage * limitPerPage) + 1}</td>
                                                <td>{role.id}</td>
                                                <td>{role.url}</td>
                                                <td title={role.description}>{role.description}</td>
                                                <td className="d-flex align-items-center gap-1">
                                                    {/* <button className="btn btn-warning" style={{ minWidth: '30px' }} onClick={() => handleOpenEditModal(role)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </button> */}
                                                    <button className="btn btn-danger" style={{ minWidth: '30px' }} onClick={() => handleOpenModalDelete(role)}>
                                                        <i className="fa fa-trash-o"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    <tr>
                                        <td colSpan={4}>Not found roles</td>
                                    </tr>
                                </>
                        }
                    </tbody>
                </table>  
            </div>
            {
                roles &&
                    <div className="table-footer">
                        {
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        }
                    </div>
            }
            {
                isShowModalDelete && 
                    <ModalDelete
                        isShow={isShowModalDelete}
                        confirmDeleteRole={handleDeleteRole}
                        handleClose={handleCloseModalDelete}
                        dataRole={dataRole}
                    />
            }
        </div>
    )
})

export default TableRoles;