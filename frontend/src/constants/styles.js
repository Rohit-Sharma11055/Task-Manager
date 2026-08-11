const styles = {
    page:
        "min-h-screen bg-slate-950 text-white flex items-center justify-center pt-6 px-10 lg:px-16",

    authContainer:
        "w-full max-w-md",

    authCard:
        "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8",

    authHeader:
        "text-center mb-8",

    authTitle:
        "text-3xl font-bold tracking-tight",

    authSubtitle:
        "text-sm text-gray-400 mt-2",

    form:
        "space-y-5",

    fieldGroup:
        "space-y-2",

    label:
        "block text-sm font-medium text-gray-300",

    input:
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20",

    inputOption:
        "bg-black/60",

    primaryButton:
        "w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60",

    error:
        "rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300",

    authFooter:
        "mt-6 text-center text-sm text-gray-400",

    authLink:
        "font-medium text-purple-400 transition-colors hover:text-purple-300",

    divider:
        "my-6 flex items-center gap-4 text-xs text-gray-500",

    dividerLine:
        "h-px flex-1 bg-white/10",


    dashboardPage:
        "min-h-screen bg-slate-950 pt-6 px-10 lg:px-16",

    dashboardContainer:
        "mx-auto w-full max-w-7xl",

    dashboardContent:
        "space-y-8",


    //taskHeader
    taskHeader:
        "flex items-center justify-between gap-4 mb-12",

    taskHeaderGreeting:
        "text-sm text-gray-400",

    taskHeaderTitle:
        "mt-1 text-3xl font-bold text-white",

    secondaryButton:
        "rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20",

    //taskStats
    taskStats:
        "grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12",

    taskStatCard:
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5",

    taskStatLabel:
        "text-sm text-gray-400",

    taskStatValue:
        "mt-2 text-3xl font-bold text-white",


    //Task Filters
    taskFilters:
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 mb-12",

    searchWrapper:
        "sm:col-span-2 lg:col-span-1",

    searchInput:
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20",

    filterSelect:
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-200 outline-none transition-all duration-200 focus:border-purple-500/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20",

    //Task Card
    taskCard:
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 cursor-pointer transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.07]",

    taskCardExpanded:
        "border-purple-500/40 bg-white/[0.08]",

    taskCardTop:
        "flex items-start justify-between gap-4",

    taskCardTitleRow:
        "flex flex-wrap items-center gap-2",

    taskCardTitle:
        "text-lg font-semibold text-white break-words",

    completedTaskTitle:
        "line-through text-gray-400",

    taskCardDescription:
        "mt-2 text-sm text-gray-400 line-clamp-2",

    taskCardExpandIndicator:
        "shrink-0 text-xl text-gray-500",

    completedBadge:
        "inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 text-xs text-green-400",

    taskCardMeta:
        "mt-5 flex flex-wrap items-center gap-2",

    categoryBadge:
        "rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs text-purple-300",

    priorityBadge:
        "rounded-full border px-3 py-1 text-xs",

    priorityLow:
        "border-green-500/20 bg-green-500/10 text-green-400",

    priorityMedium:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

    priorityHigh:
        "border-red-500/20 bg-red-500/10 text-red-400",

    dueDate:
        "text-xs text-gray-400",

    taskCardDetails:
        "mt-5 border-t border-white/10 pt-5",

    detailRow:
        "mb-4",

    detailLabel:
        "block text-xs uppercase tracking-wider text-gray-500",

    detailValue:
        "mt-1 text-sm text-gray-300",

    taskActions:
        "flex flex-wrap gap-2",

    taskActionButton:
        "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white",

    deleteActionButton:
        "inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300",

    
    //TaskList
    taskList:
        "grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12",

    emptyState:
        "rounded-2xl border border-white/10 bg-white/5 p-10 text-center",

    emptyStateTitle:
        "text-xl font-semibold text-white",

    emptyStateText:
        "mt-2 text-sm text-gray-400",


    //Task Modal
    modalOverlay:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm",

    modal:
        "w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl",

    modalHeader:
        "flex items-start justify-between gap-4 mb-6",

    modalTitle:
        "text-2xl font-bold text-white",

    modalSubtitle:
        "mt-1 text-sm text-gray-400",

    modalCloseButton:
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-gray-400 transition-all hover:bg-white/10 hover:text-white",

    modalForm:
        "space-y-5",

    textarea:
        "w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20",

    formGrid:
        "grid grid-cols-1 sm:grid-cols-2 gap-5",

    modalActions:
        "flex justify-end gap-3 pt-2",


    //Delete Modal
    deleteModal:
        "w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/95 p-6 text-center shadow-2xl",

    deleteIcon:
        "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-2xl text-red-400",

    deleteText:
        "mt-3 text-sm leading-6 text-gray-400",

    deleteConfirmButton:
        "rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50",


    //Task Pagination
    pagination:
        "flex items-center justify-center gap-4 mt-8 pb-15",

    paginationButton:
        "inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40",

    paginationInfo:
        "min-w-[100px] text-center text-sm text-gray-400",
        
};

export default styles;

