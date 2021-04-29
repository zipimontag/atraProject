

const convertActionNameToType=(actionName) =>{
   return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}

export const actions = new Proxy(
    {},
    {
        get: function (target, prop) {
            if (target[prop] === undefined)
                return function (args) {
                    return {
                        type: convertActionNameToType(prop),
                        paylod: args
                    }
                }
            else return target[prop];
        }
    }
)