describe('formatted_strings', () => {
  it('format_with_object', () => {
    let expInfo = {'participant': 'pierre'};
    expect(`Hey ${expInfo["participant"]}`).toBe('Hey pierre');
  });
});