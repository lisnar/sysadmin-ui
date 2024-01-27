import { Meta, StoryObj } from '@storybook/react';
import { Cell, Column, Row, TableBody, TableHeader, useAsyncList } from 'react-stately';
import { Table } from './Table.tsx';

const meta: Meta<typeof Table> = {
  component: Table,
  tags: ['autodocs'],
  args: {},
  parameters: {
    controls: { exclude: ['className'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: number;
}

export const ResizeableTable: Story = {
  render: function AsyncSortTable() {
    // const list = useAsyncList<StarWarsChar>({
    //   async load({ signal }) {
    //     const res = await fetch('https://swapi.py4e.com/api/people/?search', {
    //       signal,
    //     });
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     const json = await res.json();
    //     return {
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //       items: json.results as Iterable<StarWarsChar>,
    //     };
    //   },
    //   // eslint-disable-next-line @typescript-eslint/require-await
    //   async sort({ items, sortDescriptor }) {
    //     return {
    //       items: items.sort((a, b) => {
    //         const first = a[sortDescriptor.column as keyof StarWarsChar];
    //         const second = b[sortDescriptor.column as keyof StarWarsChar];
    //         let cmp = (parseInt(first, 10) || first) < (parseInt(second, 10) || second) ? -1 : 1;
    //         if (sortDescriptor.direction === 'descending') {
    //           cmp *= -1;
    //         }
    //         return cmp;
    //       }),
    //     };
    //   },
    // });

    const list = useAsyncList<Character>({
      async load({ signal }) {
        const res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
          signal,
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const json = await res.json();
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          items: json.results as Iterable<Character>,
        };
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async sort({ items, sortDescriptor }) {
        return {
          items: items.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Character];
            const second = b[sortDescriptor.column as keyof Character];
            let cmp =
              (parseInt(first as string) || first) < (parseInt(second as string) || second)
                ? -1
                : 1;
            if (sortDescriptor.direction === 'descending') {
              cmp *= -1;
            }
            return cmp;
          }),
        };
      },
    });

    return (
      <Table
        aria-label="Example table with client side sorting"
        selectionMode="single"
        sortDescriptor={list.sortDescriptor}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onSortChange={list.sort}
        style={{ width: '70vw', height: '200px' }}
      >
        <TableHeader>
          <Column key="name" allowsSorting allowsResizing>
            Name
          </Column>
          <Column key="height" allowsSorting allowsResizing>
            Height
          </Column>
          <Column key="mass" allowsSorting allowsResizing>
            Mass
          </Column>
          <Column key="birth_year" allowsSorting allowsResizing>
            Birth Year
          </Column>
        </TableHeader>
        <TableBody items={list.items}>
          {(item) => (
            <Row key={item.name}>{(key) => <Cell>{item[key as keyof Character]}</Cell>}</Row>
          )}
        </TableBody>
      </Table>
    );
  },
};
