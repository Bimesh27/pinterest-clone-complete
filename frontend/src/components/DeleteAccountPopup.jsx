export const DeleteAccountPopup = ({
    setShowDeletePopup,
    deleteUser,
    getMe,
    user,
}) => {
    const handleDelete = async () => {
        await deleteUser(user._id);
        await getMe();
        setShowDeletePopup((prev) => !prev);
    };

    return (
        <div className="bg-white px-8 py-2 rounded-2xl shadow-3xl transition-all duration-500 ">
            <h1 className="tracking-wide">
                Are you sure You want to delete your account 🥹!
            </h1>
            <div className="flex justify-end gap-3 pt-3">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
                    onClick={handleDelete}
                >
                    Yes
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
                    onClick={() => {
                        setShowDeletePopup((prev) => !prev);
                    }}
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default DeleteAccountPopup;
