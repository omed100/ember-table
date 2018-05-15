import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { A as emberA } from '@ember/array';

const COLUMN_COUNT = 4;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default class SimpleController extends Controller {
  @computed
  get rows() {
    let rows = emberA();
    for (let i = 0; i < 1000; i++) {
      let obj = {};
      for (let j = 0; j < COLUMN_COUNT; j++) {
        for (let k = 0; k < 3; k++) {
          obj[`${ALPHABET[j % 26]}${ALPHABET[k % 26]}`] = `${ALPHABET[j % 26]}${ALPHABET[k % 26]}`;
        }
      }
      rows.pushObject(obj);
    }

    return rows;
  }

  @computed
  get columns() {
    let columns = emberA();
    let columnWidth = 100;

    for (let j = 0; j < COLUMN_COUNT; j++) {
      let column = {
        name: `Col ${ALPHABET[j % 26]}`,
        valuePath: ALPHABET[j % 26],
        isResizable: true,
        isReorderable: true,
        subcolumns: [],
      };

      for (let i = 0; i < 3; i++) {
        column.subcolumns.push({
          name: `Col ${ALPHABET[j % 26]}${ALPHABET[i % 26]}`,
          valuePath: `${ALPHABET[j % 26]}${ALPHABET[i % 26]}`,
          width: columnWidth,
          isResizable: true,
          isReorderable: true,
        });
      }

      columns.pushObject(column);
    }

    // columns.objectAt(2).isFixed = 'right';
    // columns.objectAt(3).isFixed = 'right';

    return columns;
  }

  @action
  onSelect(selectedRows) {
    this.set('selectedRows', selectedRows);
  }
}
