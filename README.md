<div align="center"> <a href="https://www.cognicue.in/">
    <img
      src="https://media.cognicue.in/logos/logo-black.svg"
      width="650"
      height="auto"
    />
  </a>
</div>

# CogniCue SDK Example

## Projects Examples

- [React](./examples/react-app/)
- [Vanilla JavaScript](./examples/vanilla-js/)

## SDK URL

[https://sdk.cognicue.in/0.1.1/cognicue.min.js](https://sdk.cognicue.in/0.1.1/cognicue.min.js)

## Required Config

```javascript
const options = {
  accountID: "",
  audioRecord: true,
  videoRecord: true,
  interviewID: "",
  candidate: {
    email: "",
  },
};

const cognicue = new CogniCue(options);
```
