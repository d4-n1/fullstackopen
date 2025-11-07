import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Toast from './components/Toast';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  useEffect(() => {
    personsService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const filteredPersons =
    searchName === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        );

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const updatePerson = () => {
    if (
      confirm(
        `${newName} is already added to the Phonebook. Do you want to update the number?`
      )
    ) {
      const person = persons.find((person) => person.name === newName);
      const changedPerson = { ...person, number: newNumber };
      personsService
        .updatePerson(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          resetForm();
          setToastType('success');
          setToastMessage(`Updated ${returnedPerson.name}'s number`);
          setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
          }, 5000);
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          resetForm();
          setToastType('error');
          setToastMessage(`${person.name} doesn't exist`);
          setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
          }, 5000);
        });
    }
  };

  const createPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personsService.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      resetForm();
      setToastType('success');
      setToastMessage(`Added ${returnedPerson.name} to the Phonebook`);
      setTimeout(() => {
        setToastType(null);
        setToastMessage(null);
      }, 5000);
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const isPersonDuplicated = persons.some(
      (person) => person.name === newName
    );
    isPersonDuplicated ? updatePerson() : createPerson();
  };

  const deletePerson = (id) => {
    const deletedPerson = persons.find((n) => n.id === id);

    if (confirm(`Do you want to delete ${deletedPerson.name}?`)) {
      const newPersons = persons.filter((person) => person !== deletedPerson);

      personsService.deletePerson(id).then(() => setPersons(newPersons));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} onChange={handleSearchName} />

      <h3>Add new person</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onClick={deletePerson} />

      <Toast message={toastMessage} type={toastType} />
    </div>
  );
};

export default App;
