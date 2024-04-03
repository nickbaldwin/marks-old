import { expect, test } from 'vitest';
import { helper } from './helper';

test('adds 1 + 2 to equal 3', () => {
    expect(helper()).toEqual('i helped');
});
