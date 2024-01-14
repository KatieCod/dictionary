import React from "react";
import { Container, Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from "../data_manager/context";

const SearchForm = () => {

    const { updateGlobalState } = useMyContext()

    const getSearchWord = (e) => {
        let value = e.target.value;
        updateGlobalState(
            { searchWord: value },
        );
    };

    return (
        <Container>
            <Row className="justify-content-lg-end justify-content-center">
                <Col xs="auto">
                    <Form>
                        <InputGroup style={{ width: '400px' }}>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <FormControl
                                type='text'
                                placeholder="Search"
                                onChange={getSearchWord}
                            />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchForm;