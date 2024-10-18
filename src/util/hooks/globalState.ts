import {useEffect, useMemo, useState} from "react";
import {util} from "../util";

export class GlobalState<T> {
  private readonly setters: ((value: T) => void)[] = [];
  private current: T | (() => T);

  constructor(defaultValue: T | (() => T)) {
    this.current = defaultValue;
  }

  public currentValue() {
    return util.getValue(this.current);
  }

  public use(): T {
    const [value, setKeywords] = useState(this.current);

    const setter = useMemo(() => {
      this.setters.push(setKeywords);
      return setKeywords;
    }, []);

    useEffect(() => {
      return () => {
        const index = this.setters.indexOf(setKeywords);
        if (index > -1) this.setters.slice(index, 1);
      };
    }, [setter]);
    return value;
  }

  public set(value: T) {
    this.current = value;
    this.setters.forEach((setter) => {
      setter(value);
    });
  }
}

