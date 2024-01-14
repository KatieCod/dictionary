import React from "react";
import database from "../database/database";
import Table from 'react-bootstrap/Table';
import { useMyContext } from "../data_manager/context";
import { Button, Dropdown, Form } from "react-bootstrap";
import { getAllOptionsForSorting } from "../data_manager/sorting";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row } from 'react-bootstrap';


function DictionaryTable() {

    const { searchWord, updateGlobalState, globalFiltering, addedWord } = useMyContext()

    const themes = [];
    const parts_of_speech = [];
    const ratings = [];

    getAllOptionsForSorting(themes, 'theme')
    getAllOptionsForSorting(parts_of_speech, 'part_of_speech')
    getAllOptionsForSorting(ratings, 'rating')

    //collect the values from the checkboxes and update the global array accordingly

    const handleCheckboxChange = (theme, subArray) => {
        let array = globalFiltering[subArray]
        if (array.includes(theme)) {
            const newArray = array.filter((option) => option !== theme)
            updateGlobalState({ globalFiltering: { ...globalFiltering, [subArray]: newArray } });
        } else {
            array.push(theme)
            updateGlobalState({ globalFiltering: { ...globalFiltering, [subArray]: array } });
        }
    };

    const filteredDatabase = database.filter((word) => {
        const themeMatch = globalFiltering.themes.length > 0 ? globalFiltering.themes.includes(word.theme) : true
        const partOfSpeechMatch = globalFiltering.parts_of_speech.length > 0 ? globalFiltering.parts_of_speech.includes(word.part_of_speech) : true
        const ratingMatch = globalFiltering.ratings.length > 0 ? globalFiltering.ratings.includes(word.rating) : true
        const searchWordMatch = searchWord ? word.lang1.includes(searchWord.toLowerCase()) : true

        return themeMatch && partOfSpeechMatch && ratingMatch && searchWordMatch 

    })

    let latestId = database[database.length-1].id + 1

    const createNewWord = (e) => {
        const {name, value} = e.target;
        updateGlobalState({addedWord : { ...addedWord, id: latestId, [name]: value }})
    }

    const addWordToDatabase = () => {
        database.push(addedWord)
    }

    return (
        <Container>
            <Table className="mt-5">
                <thead>
                    <tr>
                        <th>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Theme
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Sort A-Z</Dropdown.Item>
                                    <Dropdown.Item>Sort Z-A</Dropdown.Item>
                                    <Form >
                                        {themes.map((theme) => (
                                            <Dropdown.ItemText>
                                                <Form.Check
                                                    key={theme.id}
                                                    type="checkbox"
                                                    label={theme}
                                                    className="ml-2"
                                                    checked={globalFiltering.themes.includes(theme)}
                                                    onChange={() => handleCheckboxChange(theme, 'themes')}
                                                />
                                            </Dropdown.ItemText>
                                        ))}
                                    </Form>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                        <th>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Part of speech
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Header>
                                        Choose
                                    </Dropdown.Header>
                                    <Form >
                                        {parts_of_speech.map((part_of_speech) => (
                                            <Dropdown.ItemText>
                                                <Form.Check
                                                    key={part_of_speech.id}
                                                    type="checkbox"
                                                    label={part_of_speech}
                                                    className="ml-2"
                                                    checked={globalFiltering.parts_of_speech.includes(part_of_speech)}
                                                    onChange={() => handleCheckboxChange(part_of_speech, 'parts_of_speech')}
                                                />
                                            </Dropdown.ItemText>
                                        ))}
                                    </Form>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                        <th>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Russian
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Sort A-Z</Dropdown.Item>
                                    <Dropdown.Item>Sort Z-A</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                        <th>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Rating
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Header>
                                        Choose
                                    </Dropdown.Header>
                                    <Form >
                                        {ratings.map((rating) => (
                                            <Dropdown.ItemText>
                                                <Form.Check
                                                    key={rating.id}
                                                    type="checkbox"
                                                    label={rating}
                                                    className="ml-2"
                                                    checked={globalFiltering.ratings.includes(rating)}
                                                    onChange={() => handleCheckboxChange(rating, 'ratings')}
                                                />
                                            </Dropdown.ItemText>
                                        ))}
                                    </Form>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                        <th>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Transcripion
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Sort A-Z</Dropdown.Item>
                                    <Dropdown.Item>Sort Z-A</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                        <th>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hebrew
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Sort A-Z</Dropdown.Item>
                                    <Dropdown.Item>Sort Z-A</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredDatabase.length > 0
                            ?
                            filteredDatabase.map(word => {
                                return (
                                    <tr>
                                        <td>{word.theme}</td>
                                        <td>{word.part_of_speech}</td>
                                        <td style={{ fontWeight: "bold", fontSize: "17px" }}>{word.lang1}</td>
                                        <td>{word.rating}</td>
                                        <td>{word.trancribe}</td>
                                        <td style={{ fontWeight: "bold", fontSize: "17px", textAlign: 'right' }}>{word.lang2}</td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <h5>no words matched</h5>
                            </tr>
                    }

                </tbody>
            </Table>
            <Form className="mb-5">
                <Row>
                    <Col>
                        <Form.Control
                            placeholder="Theme"
                            type="text"
                            name="theme"
                            onChange={createNewWord}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder="Part of speech"
                            type="text"
                            name="part_of_speech"
                            onChange={createNewWord}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder="Russian"
                            type="text"
                            name="lang1"
                            onChange={createNewWord}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder="Transcription"
                            type="text"
                            name="trancribe"
                            onChange={createNewWord}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder="Hebrew"
                            type="text"
                            name="lang2"
                            onChange={createNewWord}
                        />
                    </Col>
                    <Button onClick={addWordToDatabase} style={{cursor: "pointer"}}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{ color: 'green' }} size="2xl" />
                    </Button>
                </Row>
            </Form>
        </Container >
    )
}

export default DictionaryTable;