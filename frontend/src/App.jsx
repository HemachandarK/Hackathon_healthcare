import React, { useState } from 'react';
import { Button, Card, Label, TextInput, Navbar, Dropdown, Avatar, Modal, Table } from 'flowbite-react';
import './App.css';

const DoctorAppointments = () => {
    const [slot, setSlot] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null); 
    const [showModal, setShowModal] = useState(false); 

    const patientSlots = [
        { patient_name: 'John Doe', issue: 'Fever and Cough', time: '10:00 AM', prob: '60%' },
        { patient_name: 'Jane Smith', issue: 'Back Pain', time: '11:30 AM', prob: '75%' },
        { patient_name: 'Robert Brown', issue: 'Headache', time: '01:00 PM', prob: '70%' },
    ];

    const handleSlotSubmit = async (e) => {
        e.preventDefault();

        if (!slot) {
            alert('Please enter an available slot.');
            return;
        }
        
        setIsLoading(true);

        try {
            alert('Slot added successfully!'); 
        } catch (error) {
            console.error('Error adding slot:', error);
            alert('Failed to add slot. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardClick = (slot) => {
        setSelectedSlot(slot); 
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false); 
        setSelectedSlot(null); 
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar fluid rounded className="bg-white shadow-md">
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-800">
                        Doctor's Portal
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar alt="User settings" rounded className="bg-transparent" />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Dr. John Smith</span>
                        </Dropdown.Header>
                    </Dropdown>
                </div>
            </Navbar>

            <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
                <Card className="w-full mb-8 p-8 bg-white shadow-lg">
                    <form onSubmit={handleSlotSubmit} className="flex flex-col gap-4">
                        <div className="mb-4">
                            <Label htmlFor="slot" value="Enter Available Slot Time" />
                            <TextInput
                                id="slot"
                                type="text"
                                placeholder="e.g., 02:00 PM - 03:00 PM"
                                value={slot}
                                onChange={(e) => setSlot(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            gradientDuoTone="greenToBlue"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Add Slot'}
                        </Button>
                    </form>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {patientSlots.length === 0 ? (
                        <p className="text-center mt-5 text-lg">No patient slots available.</p>
                    ) : (
                        patientSlots.map((slot, index) => (
                            <Card
                                key={index}
                                className="flex flex-col items-start p-4 bg-white shadow-md cursor-pointer"
                                onClick={() => handleCardClick(slot)} 
                            >
                                <p className="font-semibold text-gray-900">
                                    Patient Name: <span className="font-normal">{slot.patient_name}</span>
                                </p>
                                <p className="font-semibold text-red-600">
                                    Issue: <span className="font-normal">{slot.issue}</span>
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Time: <span className="font-normal">{slot.time}</span>
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Probability of Arrival: <span className="font-normal">{slot.prob}</span>
                                </p>
                            </Card>
                        ))
                    )}
                </div>

                {selectedSlot && (
                    <Modal show={showModal} onClose={closeModal}>
                        <Modal.Header>
                            Patient Details
                        </Modal.Header>
                        <Modal.Body>
                            <div className="space-y-2 text-black">
                                <p><strong>Patient Name:</strong> {selectedSlot.patient_name}</p>
                                <p className='text-red-700'><strong>Issue:</strong> {selectedSlot.issue}</p>
                                <p><strong>Time:</strong> {selectedSlot.time}</p>
                                <p><strong>Probability of Arrival:</strong> {selectedSlot.prob}</p>
                                
                                <Table className="mt-4">
                                    <Table.Head>
                                        <Table.HeadCell>Date</Table.HeadCell>
                                        <Table.HeadCell>Description</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>2023-10-25</Table.Cell>
                                            <Table.Cell>Initial Consultation</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>2023-11-01</Table.Cell>
                                            <Table.Cell>Follow-up Visit</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={closeModal} gradientDuoTone='greenToBlue'>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
