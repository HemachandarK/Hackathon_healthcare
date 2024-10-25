import React, { useState } from 'react';
import { Button, Card, Label, TextInput, Navbar, Dropdown, Avatar, Modal, Table, Textarea } from 'flowbite-react';
import { FaComment } from 'react-icons/fa';
import './App.css';

const DoctorAppointments = () => {
    const [slot, setSlot] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const patientSlots = [
        { patient_name: 'Rishi', issue: 'Fever and Cough', time: '10:00 AM', prob: '60%' },
        { patient_name: 'Jeyabalan', issue: 'Back Pain', time: '11:30 AM', prob: '75%' },
        { patient_name: 'Ajay', issue: 'Headache', time: '01:00 PM', prob: '70%' },
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
            setSlot('');
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

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userInput }]);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: "Thank you for your message! How can I assist you further?" },
            ]);
            setUserInput('');
        }
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
                            <span className="block text-sm">Dr. Vetri</span>
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
                                placeholder="e.g., 13:00 PM - 14:00 PM"
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
                                <br/>
                                <p className='text-gray-800'><strong>Previous Sittings:</strong></p>

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

            <div className="fixed bottom-6 right-6">
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center justify-center p-2 rounded-full bg-green-600 text-white shadow-md hover:bg-green-700 transition">
                    <FaComment size={30} />
                </button>
            </div>

            <Modal
                show={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                size="md"
            >
                <Modal.Header>Chatbot</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col h-96 overflow-y-auto p-4">
                        <div className="flex flex-col space-y-2">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-400 text-white' : 'bg-gray-200 text-black'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleChatSubmit} className="mt-4 flex">
                        <Textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message here..."
                            rows={2}
                            className="flex-grow"
                        />
                        <Button type="submit" className="ml-2" gradientDuoTone='greenToBlue'>Send</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DoctorAppointments;
