import slugify from "slugify";

const char_map = {
    'Á': 'A', 'Ă': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Â': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Đ': 'D',
    'á': 'a', 'ă': 'a', 'ắ': 'a', 'ặ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'â': 'a', 'ấ': 'a', 'ậ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'đ': 'd',
    // You can continue the list for the rest of the characters
}

const createSlug = string => {
    let str = string.replace(/[ÁĂẮẶẰẲẴÂẤẬẦẨẪĐáăắặằẳẵâấậầẩẫđ]/g, function(x) { return char_map[x]; })
    return slugify(str, {
        replacement: '-',  // replace spaces with replacement
        remove: undefined, // regex to remove characters
        lower: true,       // result in lower case
        strict: true,      // strip special characters except replacement
    })
}



