import {FormError} from "./StyledForm";

export class StyledFormData {
  formError: FormError | undefined = undefined

  constructor(
    private readonly formData: FormData
  ) {
  }

  append(key: string, value: string) {
    if (!this.formError) this.formError = {}
    this.formError[key] = value
  }

  get(key: string, message: string = `${key}を入力してください`): string | File | FileList | undefined {
    const value = this.formData.get(key);
    if (!value) {
      if (!this.formError) this.formError = {}
      this.formError[key] = message;
      return undefined
    }
    return value
  }

  getAll(key: string, message: string = `${key}を入力してください`): (string | File | FileList | undefined)[] {
    const value = this.formData.getAll(key);
    if (!value) {
      if (!this.formError) this.formError = {}
      this.formError[key] = message;
      return []
    }
    return value
  }

  getStr(key: string, message: string = `${key}を入力してください`): string | undefined {
    const value = this.formData.get(key);
    if (typeof value !== 'string' || !value) {
      if (!this.formError) this.formError = {}
      this.formError[key] = message;
      return undefined
    }
    return value
  }

  getFile(key: string, message: string = `${key}を入力してください`): File | undefined {
    const value = this.getFileOrFileList(key);
    if (value == undefined) return undefined
    if (value instanceof File) return value
    this.append(key, message)
    return undefined
  }

  getFileList(key: string, message: string = `${key}を入力してください`): FileList | undefined {
    const value = this.getFileOrFileList(key);
    if (value == undefined) return undefined
    if (value instanceof FileList) return value
    this.append(key, message)
    return undefined
  }

  getFileOrFileList(key: string, message: string = `${key}を入力してください`): File | FileList | undefined {
    const value = this.formData.get(key);
    if (typeof value !== 'object' || !value) {
      if (!this.formError) this.formError = {}
      this.formError[key] = message;
      return undefined
    }
    return value
  }

  validate(...args: (string | undefined)[])  {
    for (const key in args) {
      if (!key) return false
    }
    return !this.formError;
  }
}