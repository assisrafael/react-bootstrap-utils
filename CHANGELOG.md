# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.15.3](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.15.2...v0.15.3) (2020-05-27)


### Bug Fixes

* **forms:** show visual indication of required fields ([4095743](https://github.com/assisrafael/react-bootstrap-utils/commit/40957434fb3a91db6457d31bf59b963f877921cb))

### [0.15.2](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.15.1...v0.15.2) (2020-05-27)


### Bug Fixes

* **forms:** only validate an element if the element exists ([38eaedc](https://github.com/assisrafael/react-bootstrap-utils/commit/38eaedcb0ba29f0cbf1a505632f9ac5ec8d7c0b7))

### [0.15.1](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.15.0...v0.15.1) (2020-05-18)


### Bug Fixes

* **getValueByPath:** handle null objects ([48c4b23](https://github.com/assisrafael/react-bootstrap-utils/commit/48c4b23d4c0b145de220bfde731de1b0a140cc1b))

## [0.15.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.7...v0.15.0) (2020-04-28)


### Features

* **forms:** allow input disable (with boolean or function that returns boolean) ([39cb627](https://github.com/assisrafael/react-bootstrap-utils/commit/39cb62724bd1d7fd1d619086ddf0cb9139ed11c4))
* **table:** allow paths as attributes values on column definition ([ddeff7b](https://github.com/assisrafael/react-bootstrap-utils/commit/ddeff7bac73012069f952860ef0ab7760d2c6220))


### Bug Fixes

* **dialog:** always remove .modal-open class from body after closing the dialog ([341dec3](https://github.com/assisrafael/react-bootstrap-utils/commit/341dec38d085fbd59cee57319480f3f321652175))

### [0.14.7](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.6...v0.14.7) (2020-04-15)


### Bug Fixes

* **forms:** allow 0 to be filled into input[type=number] again ([e5e7a70](https://github.com/assisrafael/react-bootstrap-utils/commit/e5e7a70d2d38617efdcf08747c98502ab12a4bf5))

### [0.14.6](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.5...v0.14.6) (2020-04-14)


### Bug Fixes

* **forms:** check if value is null before rendering input controls ([ddb7b71](https://github.com/assisrafael/react-bootstrap-utils/commit/ddb7b714783477aaa23f9539936025dc571e747b))

### [0.14.5](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.4...v0.14.5) (2020-04-14)


### Bug Fixes

* **forms:** fix date parsing when default value is provided ([e2df77b](https://github.com/assisrafael/react-bootstrap-utils/commit/e2df77b39af31879c54a45025a1a6426fa185505))
* **forms:** fix number inputs to throw NaN errors when empty ([c663463](https://github.com/assisrafael/react-bootstrap-utils/commit/c66346388133b45c8c7891957dfcc93ed5e5793a))

### [0.14.4](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.3...v0.14.4) (2020-04-13)


### Bug Fixes

* **forms:** fix number input default value to allow 0 to be stored in state ([16905bd](https://github.com/assisrafael/react-bootstrap-utils/commit/16905bd9cca928ec7221041cd3042aa42bd3efc7))

### [0.14.3](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.2...v0.14.3) (2020-04-13)


### Features

* **forms:** include value parsing from type prop ([8d7b56e](https://github.com/assisrafael/react-bootstrap-utils/commit/8d7b56edb706924361176d5f4710cf6c4574691e))

### [0.14.2](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.1...v0.14.2) (2020-04-13)


### Bug Fixes

* **forms:** fix FormCheckbox and FormSwitch value initialization ([cb324be](https://github.com/assisrafael/react-bootstrap-utils/commit/cb324be15fb9e051c0ee57dbed1f98663c176dce))

### [0.14.1](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.14.0...v0.14.1) (2020-04-13)


### Bug Fixes

* **forms:** fix broken forms when onChange was not defined ([9fc3975](https://github.com/assisrafael/react-bootstrap-utils/commit/9fc3975bc6f50c381c062e81efb489cbdfe54ef4))

## [0.14.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.13.0...v0.14.0) (2020-04-12)


### Bug Fixes

* **forms:** change form transform and onChange calls to reduce excessive calls ([d93d1a9](https://github.com/assisrafael/react-bootstrap-utils/commit/d93d1a93e4243eefbc83a4cc3051c144faae950a))

## [0.13.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.12.0...v0.13.0) (2020-04-12)


### Bug Fixes

* **demo:** fix form examples initial value select input with trackby ([7baff72](https://github.com/assisrafael/react-bootstrap-utils/commit/7baff72c2febed1c8c52b28cb26468a97bfe657c))
* **forms:** async and debounced call of transform function ([31968c3](https://github.com/assisrafael/react-bootstrap-utils/commit/31968c3376d962a3f0f35e641b3f55ba75b20e7b))

## [0.12.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.11.4...v0.12.0) (2020-04-10)


### Features

* **forms:** allow objects as FormSelect value ([d45adfd](https://github.com/assisrafael/react-bootstrap-utils/commit/d45adfd38efc72ea8249c3758636423bb46f82a9))


### Bug Fixes

* **forms:** fix FormAutocomplete selecting the wrong item ([a688b87](https://github.com/assisrafael/react-bootstrap-utils/commit/a688b87bf400c85516c89d28586758618cd65ba8))
* **forms:** limit FormAutocomplete options window size ([e05a70f](https://github.com/assisrafael/react-bootstrap-utils/commit/e05a70fe8986466dea05468d342291e6cca865fd))
* **modal:** do not remove container from body if it has not been included yet ([575bab9](https://github.com/assisrafael/react-bootstrap-utils/commit/575bab96f644a766de0082ff0b65a636f59690b6))

### [0.11.4](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.11.3...v0.11.4) (2020-04-07)


### Features

* **forms:** allow form data transformation after each input change ([41ea647](https://github.com/assisrafael/react-bootstrap-utils/commit/41ea64780c04dc6a04e5c3a0b95197b296c1d23d))

### [0.11.3](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.11.2...v0.11.3) (2020-04-07)


### Features

* **forms:** allow useFormControl to receive type === "array" ([15003d9](https://github.com/assisrafael/react-bootstrap-utils/commit/15003d9ccb8dc3669a56a1b237a897af367a2a05))


### Bug Fixes

* **FormAutocomplete:** fix normalizeOptions argument ([2186117](https://github.com/assisrafael/react-bootstrap-utils/commit/2186117bcd66691c72260fc364849d6f43f961a8))

### [0.11.2](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.11.1...v0.11.2) (2020-04-07)


### Features

* **forms:** export useFormData hook to access formData from outside ([9575798](https://github.com/assisrafael/react-bootstrap-utils/commit/9575798f6031a7866323bad78d55f5d2b35d8678))

### [0.11.1](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.11.0...v0.11.1) (2020-04-06)


### Bug Fixes

* **utils:** exports utils ([ee052e7](https://github.com/assisrafael/react-bootstrap-utils/commit/ee052e7b59e6a155b51b7221cf39f8fae0184a3c))

## [0.11.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.10.0...v0.11.0) (2020-04-06)


### Features

* **forms:** allow data change monitoring events ([85d65cd](https://github.com/assisrafael/react-bootstrap-utils/commit/85d65cd2a1a53dda810e2825b208063ec486e9c6))


### Bug Fixes

* **list-group:** include item index on template function argument list ([c2c32c4](https://github.com/assisrafael/react-bootstrap-utils/commit/c2c32c4146f6ba469ec17a342973bb2d657e0fa6))
* **list-group:** include item object into "onSelect" argument list ([5d35c6c](https://github.com/assisrafael/react-bootstrap-utils/commit/5d35c6c671a4fb665b59fa51b748c9cca9877de0))
* **modal:** always remove .modal-open on body classList after onClose ([75b3fd7](https://github.com/assisrafael/react-bootstrap-utils/commit/75b3fd77e5eafb42914651fbfb6551e9185ec58b))

## [0.10.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.9.0...v0.10.0) (2020-03-27)


### Features

* **forms:** allow deep objects and arrays as form control names ([9d0d1dd](https://github.com/assisrafael/react-bootstrap-utils/commit/9d0d1dd11acf62212fd91b4725791797f34303b3))
* **utils:** include getters and setters utils ([0b46d08](https://github.com/assisrafael/react-bootstrap-utils/commit/0b46d085e4ee10d7e2d85c0e7a951d71ef19887e))

## [0.9.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.8.5...v0.9.0) (2020-03-27)


### Bug Fixes

* **FormAutocomplete:** clear search value onBlur if no option was selected ([3004f4b](https://github.com/assisrafael/react-bootstrap-utils/commit/3004f4bde55fa9d5f4eb01cf0e0242de3661796d))
* **FormAutocomplete:** fix FormAutocomplete validation feedback ([6a67e45](https://github.com/assisrafael/react-bootstrap-utils/commit/6a67e451ea8a0a733083dd2d1550e17560b4bc25))
* **forms:** reset submitAttempted state on form reset ([4be36e2](https://github.com/assisrafael/react-bootstrap-utils/commit/4be36e2c9016524604741ae6ba8ce3e95e21eba1))

### [0.8.5](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.8.4...v0.8.5) (2020-03-25)


### Features

* **forms:** extract and exports "useFormControl" (custom hook) to allow external custom form elements ([c37b955](https://github.com/assisrafael/react-bootstrap-utils/commit/c37b955b2e38acacbbffc2e6eebf73785722cb3e))


### Bug Fixes

* **forms:** change onCancel prop-type to optional ([57bcdb8](https://github.com/assisrafael/react-bootstrap-utils/commit/57bcdb875a511f4d4ef3eb31eb0e36179e361a4f))
* **tabs:** change tab title prop-types to allow jsx content ([8ac7cb6](https://github.com/assisrafael/react-bootstrap-utils/commit/8ac7cb63dbca1b6b05a6ac13ec3777b323416fbc))

### [0.8.4](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.8.3...v0.8.4) (2020-03-25)


### Features

* **forms:** allow custom form actions ([52861bd](https://github.com/assisrafael/react-bootstrap-utils/commit/52861bd014e2c8d73698c52ee6e0164a747a2882))


### Bug Fixes

* **toasts:** fix prop-types warning about multiple children ([8dbe04c](https://github.com/assisrafael/react-bootstrap-utils/commit/8dbe04c12679d916d588bf69a05f5316f0a688f1))

### [0.8.3](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.8.2...v0.8.3) (2020-03-25)

### [0.8.2](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.8.1...v0.8.2) (2020-03-19)


### Bug Fixes

* **forms:** form elements validation should be optional ([74b32e9](https://github.com/assisrafael/react-bootstrap-utils/commit/74b32e95ebc41ecfb0bd896d80a5717de9e65d39))

### [0.8.1](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.8.0...v0.8.1) (2020-03-19)


### Features

* **table:** allow table column header customization ([4f46927](https://github.com/assisrafael/react-bootstrap-utils/commit/4f46927ae176f24e2c4f53a081b19e870848d695))

## [0.8.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.7.0...v0.8.0) (2020-03-19)


### Features

* **forms:** allow using bootstrap form validation feedback ([39e0c81](https://github.com/assisrafael/react-bootstrap-utils/commit/39e0c81bce4a552aa54ea75ae07e4b5e8058c3c2))
* **forms:** implement custom form element validations ([e8061ca](https://github.com/assisrafael/react-bootstrap-utils/commit/e8061ca999c8e5f7dc6aa3d836a2bbb89a3b3959))
* **forms:** show validation messages bellow form elements ([2f6e3a5](https://github.com/assisrafael/react-bootstrap-utils/commit/2f6e3a5a6894754e838a5cb7b6ef86936b25625d))
* **toasts:** implement toast components ([3e94bf1](https://github.com/assisrafael/react-bootstrap-utils/commit/3e94bf1c0886d9cacda553b7fd9750ff74a1e071))


### Bug Fixes

* **forms:** include missing validation properties do FormInput ([927f23e](https://github.com/assisrafael/react-bootstrap-utils/commit/927f23ecb1ffc338509f2cc729d11ab6bc6995c7))

## [0.7.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.6.0...v0.7.0) (2020-03-18)


### Features

* **dropdown:** implement Dropdown component ([6c84a5b](https://github.com/assisrafael/react-bootstrap-utils/commit/6c84a5bd28f8d69f5d4a0bcebe0e270ecc3d48b8))
* **forms:** implement FormAutocomplete and FormGroupAutocomplete ([05dab8e](https://github.com/assisrafael/react-bootstrap-utils/commit/05dab8e579c29551f0bd4e98821b23934889aa98))


### Bug Fixes

* **list-group:** fix ListGroupItem propTypes ([48909ae](https://github.com/assisrafael/react-bootstrap-utils/commit/48909ae0d77b3a84c10d77f7bca553d43f22b18c))
* **modal:** remove event listener on clean up ([94fec85](https://github.com/assisrafael/react-bootstrap-utils/commit/94fec855be484c89538e0cd0af825b38182f3383))

## [0.6.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.5.3...v0.6.0) (2020-03-17)


### Features

* **dialog:** implement Dialog, AlertDialog and ConfirmationDialog ([ccd6bb8](https://github.com/assisrafael/react-bootstrap-utils/commit/ccd6bb8c44223ef163047ac6af9ded9665b72d43))
* **list-group:** implement ListGroup and StatefulListGroup ([97908e7](https://github.com/assisrafael/react-bootstrap-utils/commit/97908e7a9ebbe9894db43a178a880a8b0dc69a70))

### [0.5.3](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.5.2...v0.5.3) (2020-03-16)

### [0.5.2](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.5.1...v0.5.2) (2020-03-16)

### [0.5.1](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.5.0...v0.5.1) (2020-03-13)

## [0.5.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.4.0...v0.5.0) (2020-03-10)


### Features

* **pagination:** implement <Pagination> component ([e6d10f8](https://github.com/assisrafael/react-bootstrap-utils/commit/e6d10f8ba3c779ddc38457b8419df68a733327b7))
* **tabs:** allow initial tab configuration ([f553213](https://github.com/assisrafael/react-bootstrap-utils/commit/f553213c382f4fbc54cfe3b704af44f19d7a56a6))

## [0.4.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.3.0...v0.4.0) (2020-03-10)


### Features

* **tabs:** implement <Tabs> and <StatefulTabs> components ([46121b9](https://github.com/assisrafael/react-bootstrap-utils/commit/46121b97f29a460edcb8eed59bd51271d45d3dc7))


### Bug Fixes

* include missing propTypes definitions and fix eslint warnings ([0f1c85b](https://github.com/assisrafael/react-bootstrap-utils/commit/0f1c85b415410a671eed3685d2cbeea9fa2f97c2))

## [0.3.0](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.2.4...v0.3.0) (2020-03-05)


### Features

* **table:** allow table actions ([d77f4d8](https://github.com/assisrafael/react-bootstrap-utils/commit/d77f4d829a6faf52047f8dbd874d24c2df310205))
* **table:** include table cell value formatting ([c0be209](https://github.com/assisrafael/react-bootstrap-utils/commit/c0be209eb1aec6c65c0fe88058df7bf03d6fb98f))

### [0.2.4](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.2.3...v0.2.4) (2020-03-05)


### Bug Fixes

* **forms:** include an option to change the FormInput type ([7313d75](https://github.com/assisrafael/react-bootstrap-utils/commit/7313d75cb92ce6c1015dc605713bf074a3263703))

### [0.2.3](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.2.2...v0.2.3) (2020-03-04)

### Features

- **table:** allow column alignment ([1865b9f](https://github.com/assisrafael/react-bootstrap-utils/commit/1865b9fdee29e3b5f02113e7e986449690114687))
- **table:** allow table captions ([103c7e4](https://github.com/assisrafael/react-bootstrap-utils/commit/103c7e483b12f3f59e7b2eca355ec3185eaed112))
- **table:** include style options to the table, rows and columns ([00eeb0a](https://github.com/assisrafael/react-bootstrap-utils/commit/00eeb0a23ffcafbbc5e2519a78f022f79122cb4e))
- **table:** make every table responsive ([0aa78ca](https://github.com/assisrafael/react-bootstrap-utils/commit/0aa78ca743d0f8d0ea8048d578b3941e694bdb5c))

### [0.2.2](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.2.1...v0.2.2) (2020-03-04)

### Features

- **table:** implement \<Table> component ([8eceed6](https://github.com/assisrafael/react-bootstrap-utils/commit/8eceed675571c7735bb484128d7f59dd679f9d5f))

### Bug Fixes

- **forms:** remove debug from \<Form> component ([d64c136](https://github.com/assisrafael/react-bootstrap-utils/commit/d64c13631e6051a87fde756ed27d492b4659c09b))

### [0.2.1](https://github.com/assisrafael/react-bootstrap-utils/compare/v0.2.0...v0.2.1) (2020-03-04)
