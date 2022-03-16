import ValueObject from "../value-object";

class StubValueObject extends ValueObject{}

describe("ValueObject Unit Test", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({prop1: 'value1'});
    expect(vo.value).toStrictEqual({prop1: 'value1'});
  });

  it('should convert to a string', () => {
    const date = new Date();

    let arrange = [
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      { received: {prop: 'value'}, expected: JSON.stringify({prop: 'value'}) }
    ];

    arrange.forEach(item => {
      const vo = new StubValueObject(item.received);
      expect(`${vo}`).toBe(item.expected);
    });
  });

  it("should be a immutable obj", () => {
    const obj = {
      prop1: 'value1',
      deep: {
        prop2: "value",
        prop3: new Date()
      }
    };

    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value.prop1 = "change value";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (vo as any).value.deep.prop2 = "change value";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
