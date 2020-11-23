import axios, { Method } from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import Header from "../components/header.tsx";
import { Entry } from "./db";
import { queryCache } from "./_app";

const queryFn = <T extends unknown>(
  url: string,
  method: Method = "GET"
) => async (args?: unknown) => {
  const { data } = await axios.request<T>({ method, url, data: args });
  return data;
};

const useEntries = () => useQuery("entries", queryFn<Entry[]>("api/entries"));

const useCreateEntry = () =>
  useMutation<unknown, unknown, Entry>(queryFn<Entry>("api/entries", "POST"), {
    onSuccess: () => {
      queryCache.invalidateQueries("entries");
    },
  });

const EntryRow = ({ entry: { label, value } }: { entry: Entry }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const EntryCreator = () => {
  const [createEntry] = useCreateEntry();
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);
  return (
    <div className="mt-3 mb-3">
      <h4>Neuen Eintrag erstellen</h4>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Gebe den Namen des Eintrags an"
          value={label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />
      </Form.Group>

      <Form.Group controlId="formValue">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="number"
          placeholder="Gebe den Wert des Eintrags an"
          value={value}
          onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={async () => {
          await createEntry({ id: "", label, value });
        }}
      >
        Eintrag erstellen
      </Button>
    </div>
  );
};

export default function Home() {
  const { data: entries, error, isLoading } = useEntries();

  return (
    <Container>
      <Header />

      <EntryCreator />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>Eintrag</td>
            <td>Wert</td>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry) => (
            <EntryRow key={entry.id} {...{ entry }} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
