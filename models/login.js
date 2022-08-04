login.Init(
    {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
            alphanumeric: true,
        }
    }}