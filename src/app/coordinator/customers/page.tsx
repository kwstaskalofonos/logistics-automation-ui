'use client'

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import LPaging from "@/components/LPaging";
import { Item } from "@/services/entities";
import usePaging, { PaginationHandle } from "@/(hooks)/usePaging";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import Portlet from "@/components/Portet";
import SearchWrapper from "@/components/SearchWrapper";
import GenericModal from "@/components/GenericModal";

const CoordCustomersPage: React.FunctionComponent = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <h1 onClick={()=>setShowModal(true)}>Open Modal</h1>

            {showModal &&
                <GenericModal setShowModal={setShowModal}/>
            }
        </React.Fragment>
    );
};

export default CoordCustomersPage;