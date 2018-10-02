const roles = {
    guest: {
        can: ['read'],
    },
    manager: {
        can: ['publish'],
        inherits: ['writer'],
    },
    writer: {
        can: [
            'write',
            {
                name: 'edit',
                when: params => {
                    return params.user.id === params.post.owner
                },
            },
        ],
        inherits: ['guest'],
    },
}

function init() {
    if (typeof roles !== 'object') {
        throw new TypeError('Expected an object as input')
    }

    this.roles = roles
    const map = {}
    Object.keys(roles).forEach(role => {
        map[role] = {
            can: {},
        }
        if (roles[role].inherits) {
            map[role].inherits = roles[role].inherits
        }

        roles[role].can.forEach(operation => {
            if (typeof operation === 'string') {
                map[role].can[operation] = 1
            } else if (typeof operation.name === 'string' && typeof operation.when === 'function') {
                map[role].can[operation.name] = operation.when
            }
            // Ignore definitions we don't understand
        })
    })

    this.roles = map
}

export function can(role, operation, params) {
    // Check if role exists
    if (!this.roles[role]) {
        return false
    }
    const $role = this.roles[role]
    // Check if this role has this operation
    if ($role.can[operation]) {
        // Not a function so we are good
        if (typeof $role.can[operation] !== 'function') {
            return true
        }
        // If the function check passes return true
        if ($role.can[operation](params)) {
            return true
        }
    }

    // Check if there are any parents
    if (!$role.inherits || $role.inherits.length < 1) {
        return false
    }

    // Check child roles until one returns true or all return false
    return $role.inherits.some(childRole => this.can(childRole, operation, params))
}
