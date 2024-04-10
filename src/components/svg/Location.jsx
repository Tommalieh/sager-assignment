/* eslint-disable react/prop-types */
const Location = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={27}
        fill="none"
        {...props}
    >
        <path
            fill={props.fill || '#fff'}
            d="M13.001 11.181a3.325 3.325 0 0 0 3.074-2.055 3.333 3.333 0 0 0-2.425-4.54A3.324 3.324 0 0 0 10.235 6 3.332 3.332 0 0 0 13 11.181Zm0-5.44a1.978 1.978 0 0 1 2.109 2.11 2.112 2.112 0 0 1-2.109 2.111 2.108 2.108 0 0 1-2.109-2.11 1.984 1.984 0 0 1 2.109-2.117v.005Z"
        />
        <path
            fill={props.fill || '#fff'}
            d="m25.979 24.939-2.166-10.843a1.084 1.084 0 0 0-1.062-.872h-4.212l.211-.333.053-.083.611-.964A7.592 7.592 0 0 0 16.266.95a7.574 7.574 0 0 0-4.152-.688 7.574 7.574 0 0 0-6.07 4.51 7.591 7.591 0 0 0 .846 7.518c.228.31.448.619.664.934h-4.3a1.082 1.082 0 0 0-1.062.872L.022 24.939a1.085 1.085 0 0 0 1.062 1.301h23.833a1.082 1.082 0 0 0 1.062-1.301ZM7.639 7.022a5.414 5.414 0 0 1 9.328-2.915 5.424 5.424 0 0 1 .617 6.578l-.609.96-.053.083A70.88 70.88 0 0 0 13 18.394a49.09 49.09 0 0 0-4.364-7.39 5.4 5.4 0 0 1-.997-3.982ZM2.406 24.067l1.733-8.674H8.9c.8 1.352 1.575 2.81 2.528 4.704l.158.316.441.883a1.083 1.083 0 0 0 1.938 0l.935-1.872c.624-1.247 1.332-2.49 2.281-4.036h4.678l1.741 8.68H2.406Z"
        />
    </svg>
)
export default Location