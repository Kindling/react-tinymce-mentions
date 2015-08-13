import invariant from 'invariant';
import containsType from './containsType';

export default function validateDataSource(dataSource) {
  invariant(dataSource instanceof Array,
    'Error transforming response: `transformedDataSource` must be an array.'
  );

  // Array of ojects with a `searchKey`
  if (containsType(dataSource, 'object')) {

    // Validate that each object has `searchKey`
    invariant(dataSource.every(s => s.hasOwnProperty('searchKey') && typeof s.searchKey === 'string'),
      'Each object in the `transformedDataSource` should contain a `searchKey`'
    );

    return {
      isComplex: true,
      dataSource
    };

  } else if (containsType(dataSource, 'string')) {
    return {
      isComplex: false,
      dataSource
    };
  } else {
    throw new Error(
      'Validation Error: `transformedDataSource` must be an array of strings ' +
      'or contain objects with a `searchKey` property.'
    );
  }
}
