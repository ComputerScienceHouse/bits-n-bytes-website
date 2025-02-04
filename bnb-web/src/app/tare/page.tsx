'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button, CardHeader } from 'reactstrap';

const TareScreen = () => {
  const initialState = 'default';
  const states = ['default', 'yellow', 'green'];
  
  const [buttonStates, setButtonStates] = useState(
    Array(4).fill(null).map(() => Array(4).fill(initialState))
  );

  const handleButtonClick = (shelfIdx: number, buttonIdx: number) => {
    setButtonStates((prevState) => {
      const newStates = prevState.map((shelf, sIdx) =>
        shelf.map((state, bIdx) => {
          if (sIdx === shelfIdx && bIdx === buttonIdx) {
            return states[(states.indexOf(state) + 1) % states.length];
          }
          return state;
        })
      );
      return newStates;
    });
  };

  const getButtonStyle = (state: string) => {
    switch (state) {
      case 'yellow': return { backgroundColor: 'yellow', color: 'black' };
      case 'green': return { backgroundColor: 'green', color: 'white' };
      default: return { backgroundColor: '#666', color: 'white' };
    }
  };

  return (
    <Container className="py-4 text-center" style={{ backgroundColor: '#222', minHeight: '100vh' }}>
      <h2 className="mb-4 text-white">Tare Screen</h2>
      <Row className="justify-content-center">
        {[0, 2].map((rowIdx) => (
          <Row key={rowIdx} className="justify-content-center mb-4">
            {[0, 1].map((colIdx) => {
              const shelfIdx = rowIdx + colIdx;
              return (
                <Col key={shelfIdx} xs={12} md={6} lg={3} className="mb-4">
                  <Card style={{ backgroundColor: '#444', color: 'white' }}>
                    <CardHeader className="text-center">Shelf {shelfIdx + 1}</CardHeader>
                    <CardBody className="d-flex flex-wrap justify-content-center">
                      {buttonStates[shelfIdx].map((state, buttonIdx) => (
                        <Button
                          key={buttonIdx}
                          onClick={() => handleButtonClick(shelfIdx, buttonIdx)}
                          className="m-2"
                          style={{ ...getButtonStyle(state), width: '60px', height: '60px' }}
                        >
                          {`${shelfIdx + 1}${String.fromCharCode(65 + buttonIdx)}`}
                        </Button>
                      ))}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default TareScreen;