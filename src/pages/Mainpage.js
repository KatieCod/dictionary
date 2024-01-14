import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DictionaryTable from "../components/DictionaryTable";
import SearchForm from "../components/SearchForm";
import { useMyContext } from "../data_manager/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Mainpage() {

  const [showAll, setShowAll] = useState(false);

  const { globalFiltering, updateGlobalState } = useMyContext()

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const filters = [];

  Object.entries(globalFiltering).forEach(([key, value]) => {
    value.forEach(filter => filters.push({[key]: filter}))
  })

  const handleFilterRemove = (theme, subArray) => {
    let array = globalFiltering[subArray]
    if (array.includes(theme)) {
        const newArray = array.filter((option) => option !== theme)
        updateGlobalState({ globalFiltering: { ...globalFiltering, [subArray]: newArray } });
    } else {
        array.push(theme)
        updateGlobalState({ globalFiltering: { ...globalFiltering, [subArray]: array } });
    }
};

  return (
    <Container>
      <Container className="mt-3 text-center">
        <Row>
          <Col>
            <Button variant={showAll ? "success" : "outline-success"} onClick={toggleShowAll}>Show All</Button>
          </Col>
          <Col>
            <Button variant="outline-success">Practice</Button>
          </Col>
        </Row>
      </Container>
      {showAll
        ?
        <Container className="mt-5">
          <SearchForm />
          <Row className="mt-5 text-center">
            {filters.map(object => Object.entries(object).map(([key, value]) => 
             <Col xs='auto' style={{cursor: 'pointer'}}
             onClick={() => handleFilterRemove(value, key)}
             >
             <FontAwesomeIcon icon={faX} style={{color: 'red'}} /> {value}
             </Col>
            ))
            
           }
          </Row>
          <DictionaryTable className="mt-4" />
        </Container>
        :
        null
      }
    </Container>
  )
}

export default Mainpage;